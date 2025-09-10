/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { reqCheckCrewName, reqRegisterCrew } from "../../../api/Crew/crewApi";
import MainContainer from "../../../components/MainContainer/MainContainer";
import useGetCrewRoleQuery from "../../../queries/Crew/useGetCrewRoleQuery";
import useGetGunguListQuery from "../../../queries/User/useGetGunguListQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import * as s from "./styles";
import Button from "../../../components/Button/Button";
import { MenuItem, Select } from "@mui/material";

function CrewRegister(props) {
  const navigate = useNavigate();
  const { data: principalData, isLoading } = usePrincipalQuery();
  const userId = principalData?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  useEffect(() => {
    if (isLoading || CrewRoleQuery.isLoading) return;

    const userId = principalData?.data?.body?.user?.userId;
    if (!userId) {
      alert("로그인 후 이용 부탁드립니다.");
      navigate("/auth/oauth2/signin");
      return;
    }

    const roles = CrewRoleQuery?.data || [];
    const isLeader = roles.some(role => role.roleId === 1);

    if (isLeader) {
      alert("이미 크루장입니다.");
      navigate("/");
    }
  }, [principalData, isLoading, navigate, CrewRoleQuery.data, CrewRoleQuery.isLoading]);

  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data.body || [];
  const [preview, setPreview] = useState({
    profilePicture: "",
    thumbnailPicture: "",
  });

  const [isDuplicated, setDuplicated] = useState(true);

  const [registerCrew, setRegisterCrew] = useState({
    crewName: "",
    title: "",
    content: "",
    limitedPeople: "",
    profilePicture: null,
    thumbnailPicture: null,
    gunguId: "",
  });

  const handleImgAddOnClick = (e, name) => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setRegisterCrew((prev) => ({
        ...prev,
        [name]: file,
      }));
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreview((prev) => ({
          ...prev,
          [name]: e.target.result,
        }));
      };

      fileReader.readAsDataURL(file);
    };

    fileInput.click();
  };

  const handleCheckCrewNameOnClick = async () => {
    const name = registerCrew?.crewName?.trim();
    if (!name) {
      alert("크루명을 입력해 주세요.");
      return;
    }
    try {
      const { data } = await reqCheckCrewName(name);
      const raw = data?.body;

      const isDuplicated =
        raw === true || raw === "true" || raw === 1 || raw === "1";
      setDuplicated(isDuplicated);
      if (isDuplicated) {
        alert("중복된 크루명 입니다.");
      } else {
        alert("사용 가능한 크루명 입니다!");
      }
    } catch (e) {
      console.error("checkCrewName error:", e);
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleQuillOnChange = (value) => {
    setRegisterCrew((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleRegisterCrewOnClick = async () => {
    if (isDuplicated) {
      alert("크루명 중복 확인 필요");
      return;
    }
    const formData = new FormData();

    formData.append("gunguId", registerCrew.gunguId);
    formData.append("crewName", registerCrew.crewName);
    formData.append("title", registerCrew.title);
    formData.append("content", registerCrew.content);
    formData.append("limitedPeople", registerCrew.limitedPeople);

    formData.append("profilePicture", registerCrew.profilePicture);
    formData.append("thumbnailPicture", registerCrew.thumbnailPicture);

    try {
      const res = await reqRegisterCrew(formData);
      alert("크루가 등록되었습니다.");
      navigate("/");
    } catch (err) {
      if (err?.response?.status === 409) {
        alert("이미 등록 크루가 있습니다.");
      } else {
        alert("등록에 실패했습니다.");
      }
    }
  }

  const toolbarOptions = [
    [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["blockquote", "link"],
  ];

  return (
    <MainContainer>
      <div css={s.mainBox}>
        <div css={s.titleBox}>
          <div css={s.banner} onClick={(e) => handleImgAddOnClick(e, "thumbnailPicture")}>
            <div>
              {preview.thumbnailPicture && <img src={preview.thumbnailPicture} alt="크루 썸네일" />}
              <div css={s.imageOverlay} className="overlay">클릭하여 썸네일 업로드</div>
            </div>
          </div>

          <div css={s.crewInfoSection}>
            <div css={s.profilePicture} onClick={(e) => handleImgAddOnClick(e, "profilePicture")}>
              {preview.profilePicture && <img src={preview.profilePicture} alt="크루 프로필" />}
              <div css={s.profileImageOverlay} className="overlay">프로필 업로드</div>
            </div>

            <div css={s.crewTextBox}>
              <h2>{registerCrew.crewName || "크루명 입력"}</h2>
              <div css={s.crewText}>
                <p css={s.gungu}>{gunguList.find(g => String(g.gunguId) === String(registerCrew.gunguId))?.gunguName || "지역 미선택"}</p>
                <p>멤버수 1 / {registerCrew.limitedPeople || 10}</p>
              </div>
            </div>

            <Button onClick={handleRegisterCrewOnClick}>
              크루 등록
            </Button>
          </div>
        </div>

        <div css={s.mainLine}>
          <p css={s.fontBold}>크루 정보 입력</p>
          <div css={s.field}>
            <label css={s.label}>크루명</label>
            <div css={s.checkName}>
              <input
                type="text"
                value={registerCrew.crewName}
                onChange={(e) => setRegisterCrew(prev => ({ ...prev, crewName: e.target.value }))}
                css={s.input}
                placeholder="크루명을 입력하세요"
              />
              <Button onClick={handleCheckCrewNameOnClick}>
                중복 확인
              </Button>
            </div>
          </div>

          <div css={s.field}>
            <label css={s.label}>한줄 소개</label>
            <input
              type="text"
              value={registerCrew.title}
              onChange={(e) => setRegisterCrew(prev => ({ ...prev, title: e.target.value }))}
              css={s.input}
              placeholder="크루를 한줄로 소개해주세요"
            />
          </div>

          <div css={s.field}>
            <label css={s.label}>최대 인원</label>
            <div css={s.numberInputContainer}>
              <input
                type="number"
                value={registerCrew.limitedPeople}
                onChange={(e) => setRegisterCrew(prev => ({ ...prev, limitedPeople: e.target.value }))}
                css={s.numberInput}
                min={1}
                max={100}
              />
            </div>
          </div>

          <div css={s.field}>
            <label css={s.label}>지역 선택</label>
            <Select
              css={s.selectBox}
              value={registerCrew.gunguId}
              onChange={(e) =>
                setRegisterCrew(prev => ({ ...prev, gunguId: e.target.value }))
              }
              displayEmpty
            >
              <MenuItem value="" css={s.menuItem}>
                지역을 선택해주세요
              </MenuItem>
              {gunguList.map((g) => (
                <MenuItem
                  key={g.gunguId}
                  value={g.gunguId}
                  css={s.menuItem}
                >
                  {g.gunguName}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div css={s.field}>
            <label css={s.label}>크루 소개</label>
            <div css={s.quillWrapper}>
              <ReactQuill
                value={registerCrew.content}
                onChange={handleQuillOnChange}
                modules={{ toolbar: toolbarOptions }}
                placeholder="크루에 대해 자세히 소개해주세요"
              />
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );

}


export default CrewRegister;
