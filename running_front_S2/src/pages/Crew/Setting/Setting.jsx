/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useState, useEffect } from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useCrewStore } from '../../../stores/useCrewStroes';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import { reqCheckCrewName, reqCrewProfileUpdate, reqCrewThumbnailUpdate, reqCrewUpdate } from '../../../api/Crew/crewApi';
import useCrewDetailQuery from '../../../queries/Crew/List/useCrewDetailQuery';
import { reqGetMemberCount } from '../../../api/Crew/memberApi';
import Button from '../../../components/Button/Button';

function Setting(props) {
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const { crewId } = useCrewStore();
  const crewDetailQuery = useCrewDetailQuery(crewId);
  const crew = crewDetailQuery?.data?.body;
  const [countMember, setCountMember] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [isDuplicated, setDuplicated] = useState(true);

  const [updateCrew, setUpdateCrew] = useState({
    crewName: '',
    title: '',
    content: '',
    limitedPeople: 1,
  });

  const [errors, setErrors] = useState({
    crewName: '',
    title: '',
    limitedPeople: '',
  });

  useEffect(() => {
    if (crew) {
      setUpdateCrew({
        crewName: crew.crewName || '',
        title: crew.title || '',
        content: crew.content || '',
        limitedPeople: crew.limitedPeople || 1,
      });
    }
  }, [crew]);

  useEffect(() => {
      if (!crewId) return;               
      (async () => {
        try {
          const res = await reqGetMemberCount(crewId);
          const count = res?.data?.body ?? res?.body;
          setCountMember(Number(count));   
        } catch (e) {
          console.error("getMemberCount error", e);
        }
      })();
    }, [crewId]);

  const handleThumbnailImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("thumbnailPicture", file);
        await reqCrewThumbnailUpdate(crew.crewId, formData);
        alert("크루 썸네일 사진 변경이 저장되었습니다.");
        crewDetailQuery.refetch();
      } catch (error) {
        alert("썸네일 사진 변경에 실패했습니다.");
        console.error(error);
      }
    };
    fileInput.click();
  };

  const handleProfileImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("profilePicture", file);
        await reqCrewProfileUpdate(crew.crewId, formData);
        alert("크루 프로필 사진 변경이 저장되었습니다.");
        crewDetailQuery.refetch();
      } catch (error) {
        alert("프로필 사진 변경에 실패했습니다.");
        console.error(error);
      }
    };
    fileInput.click();
  };

  const handleCheckCrewNameOnClick = async () => {
    if (!updateCrew.crewName.trim()) return;
    try {
      const { data } = await reqCheckCrewName(updateCrew.crewName);
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

  const validateField = (field, value) => {
    switch (field) {
      case "crewName":
        if (!value || value.trim().length < 2) {
          return "크루명은 2글자 이상 입력해주세요.";
        }
        if (value.length > 20) {
          return "크루명은 20글자 이하로 입력해주세요.";
        }
        return "";
      case "title":
        if (!value || value.trim().length < 5) {
          return "한줄 소개는 5글자 이상 입력해주세요.";
        }
        if (value.length > 50) {
          return "한줄 소개는 50글자 이하로 입력해주세요.";
        }
        return "";
      case "limitedPeople":
        if (value < countMember) {
          return `현재 멤버 수(${countMember})보다 적을 수 없습니다.`;
        }
        if (value > 100) {
          return "최대 100명까지 설정 가능합니다.";
        }
        return "";
      default:
        return "";
    }
  };

  const handleCrewNameChange = (e) => {
    const value = e.target.value;
    setUpdateCrew(prev => ({ ...prev, crewName: value }));
    const errorMsg = validateField("crewName", value);
    setErrors(prev => ({ ...prev, crewName: errorMsg }));
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setUpdateCrew(prev => ({ ...prev, title: value }));
    const errorMsg = validateField("title", value);
    setErrors(prev => ({ ...prev, title: errorMsg }));
  };

  const handleContentChange = (value) => {
    setUpdateCrew(prev => ({ ...prev, content: value }));
  };

  const handleLimitedPeopleChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setUpdateCrew(prev => ({ ...prev, limitedPeople: value }));
    const errorMsg = validateField("limitedPeople", value);
    setErrors(prev => ({ ...prev, limitedPeople: errorMsg }));
  };

  const validateAll = () => {
    const crewNameError = validateField("crewName", updateCrew.crewName);
    const titleError = validateField("title", updateCrew.title);
    const limitedPeopleError = validateField("limitedPeople", updateCrew.limitedPeople);

    setErrors({
      crewName: crewNameError,
      title: titleError,
      limitedPeople: limitedPeopleError,
    });

    return !crewNameError && !titleError && !limitedPeopleError;
  };

  const hasChanges = () => {
    return (
      updateCrew.crewName !== crew?.crewName ||
      updateCrew.title !== crew?.title ||
      updateCrew.content !== crew?.content ||
      updateCrew.limitedPeople !== crew?.limitedPeople
    );
  };

  const handleUpdateCrewOnClick = async () => {
    if (!validateAll()) {
      return;
    }
    if (!hasChanges()) {
      alert("변경된 내용이 없습니다.");
      return;
    }
    setIsPending(true);

    try {
      const updateData = {
        crewId: crew.crewId,
        crewName: updateCrew.crewName,
        title: updateCrew.title,
        content: updateCrew.content,
        limitedPeople: updateCrew.limitedPeople,
      };

      await reqCrewUpdate(crewId, updateData);
      alert("크루 정보가 성공적으로 저장되었습니다.");
      crewDetailQuery.refetch();
    } catch (error) {
      alert("크루 정보 저장에 실패했습니다.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div css={s.mainBox}>
      <h2>크루 정보 설정</h2>
      <div css={s.titleBox}>
        <div css={s.banner} onClick={handleThumbnailImgUpdateClick}>
          <div>
            <img src={crew?.thumbnailPicture} alt="크루 썸네일" />
            <div css={s.imageOverlay} className="overlay">클릭하여 썸네일 변경</div>
          </div>
        </div>
        <div css={s.crewInfoSection}>
          <div css={s.profilePicture} onClick={handleProfileImgUpdateClick}>
            <img src={crew?.profilePicture} alt="크루 프로필" />
            <div css={s.profileImageOverlay} className="overlay">프로필 변경</div>
          </div>

          <div css={s.crewTextBox}>
            <h2>{updateCrew.crewName || crew?.crewName}</h2>
            <div css={s.crewText}>
              <p css={s.gungu}>{crew?.gunguName}</p>
              <p>멤버수 {countMember} / {updateCrew.limitedPeople}</p>
              <p>•</p>
              <p>총 {crew?.totalKm} KM</p>
            </div>
          </div>

          <Button
            onClick={handleUpdateCrewOnClick}
            disabled={isPending}
          >
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <div css={s.mainLine}>
        <div css={s.field}>
          <label css={s.label}>크루명</label>
          <div css={s.checkName}>
            <input
              type="text"
              value={updateCrew.crewName}
              onChange={handleCrewNameChange}
              css={s.input}
              placeholder="크루명을 입력하세요"
            />
            <Button onClick={handleCheckCrewNameOnClick}>
              중복 확인
            </Button>
            {errors.crewName && <p css={s.errorMsg}>{errors.crewName}</p>}
          </div>
        </div>

        <div css={s.field}>
          <label css={s.label}>한줄 소개</label>
          <input
            type="text"
            value={updateCrew.title}
            onChange={handleTitleChange}
            css={s.input}
            placeholder="크루를 한줄로 소개해주세요"
          />
          {errors.title && <p css={s.errorMsg}>{errors.title}</p>}
        </div>

        <div css={s.field}>
          <label css={s.label}>최대 인원</label>
          <div css={s.numberInputContainer}>
            <input
              type="number"
              value={updateCrew.limitedPeople}
              onChange={handleLimitedPeopleChange}
              css={s.numberInput}
              min={countMember}
              max={100}
            />
            <span css={s.inputHint}>현재 멤버: {countMember}명</span>
          </div>
          {errors.limitedPeople && <p css={s.errorMsg}>{errors.limitedPeople}</p>}
        </div>

        <div css={s.field}>
          <label css={s.label}>크루 소개</label>
          <div css={s.quillWrapper}>
            <ReactQuill
              value={updateCrew.content}
              onChange={handleContentChange}
              modules={quillModules}
              placeholder="크루에 대해 자세히 소개해주세요"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;