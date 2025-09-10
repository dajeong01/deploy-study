/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useState } from "react";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import { SIGNUP_REGEX, SIGNUP_REGEX_ERROR_MESSAGE } from "../../../constants/signupRegex";
import { reqCheckNickname, reqUserInfoUpdate, reqUserProfileUpdate } from "../../../api/User/UserApi";
import useGetUserRankingQuery from "../../../queries/Ranking/useGetUserRankingQuery";
import Button from "../../../components/Button/Button";

function MypageModify() {
  const { data: rankings } = useGetUserRankingQuery();
  const principalQuery = usePrincipalQuery();
  const userInfo = principalQuery.data?.data?.body?.user;
  const userId = userInfo?.userId;
  

  const [updateUser, setUpdateUser] = useState({
    userId: userId,
    nickname: "",
    phoneNumber: "",
  });

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [ispatch, setIspatch] = useState(false);

  const [errors, setErrors] = useState({
    nickname: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userInfo) {
      setUpdateUser({
        nickname: userInfo.nickname || "",
        phoneNumber: userInfo.phoneNumber || "",
      });
      setIsNicknameChecked(true);
    }
  }, [userInfo]);

  const handleProfileImgUpdateClick = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("profileFile", file);
        await reqUserProfileUpdate(userId, formData);
        alert("프로필 사진 변경이 저장되었습니다.");
        principalQuery.refetch();
      } catch (error) {
        alert("프로필 사진 변경에 실패했습니다.");
        console.error(error);
      }
    };
    fileInput.click();
  };

  const validateField = (field, value) => {
    switch (field) {
      case "nickname":
        if (!SIGNUP_REGEX.nickName.test(value)) {
          return SIGNUP_REGEX_ERROR_MESSAGE.nickName;
        }
        return "";
      case "phoneNumber":
        if (!SIGNUP_REGEX.phoneNumber.test(value)) {
          return SIGNUP_REGEX_ERROR_MESSAGE.phoneNumber;
        }
        return "";
      default:
        return "";
    }
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUpdateUser(prev => ({ ...prev, nickname: value }));
    if (value !== userInfo?.nickname) {
      setIsNicknameChecked(false);
    } else {
      setIsNicknameChecked(true);
    }

    const errorMsg = validateField("nickname", value);
    setErrors(prev => ({ ...prev, nickname: errorMsg }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setUpdateUser(prev => ({ ...prev, phoneNumber: value }));

    const errorMsg = validateField("phoneNumber", value);
    setErrors(prev => ({ ...prev, phoneNumber: errorMsg }));
  };

  const handleNicknameCheck = async () => {
    const nickname = updateUser.nickname.trim();
    if (!nickname) return;
    if (nickname === userInfo?.nickname) {
      setIsNicknameChecked(true);
      alert("현재 사용 중인 닉네임입니다.");
      return;
    }

    try {
      const response = await reqCheckNickname(nickname);
      const isAvailable = response.data.body === "false";
      if (isAvailable) {
        setIsNicknameChecked(true);
      } else {
        setIsNicknameChecked(false);
        alert("중복된 닉네임입니다.");
      }
    } catch (error) {
      alert("중복확인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const validateAll = () => {
    const nicknameError = validateField("nickname", updateUser.nickname);
    const phoneError = validateField("phoneNumber", updateUser.phoneNumber);

    setErrors({
      nickname: nicknameError,
      phoneNumber: phoneError,
    });

    if (updateUser.nickname !== userInfo?.nickname && !isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return false;
    }

    return !nicknameError && !phoneError;
  };

  const hasChanges = () => {
    return (
      updateUser.nickname !== userInfo?.nickname ||
      updateUser.phoneNumber !== userInfo?.phoneNumber
    );
  };

  const handleUpdateUserOnClick = async () => {
    if (!validateAll()) {
      return;
    }
    if (!hasChanges()) {
      alert("변경된 내용이 없습니다.");
      return;
    }
    setIspatch(true);

    try {
      const updateData = {
        userId: userId,
        nickname: updateUser.nickname,
        phoneNumber: updateUser.phoneNumber,
      };

      await reqUserInfoUpdate(updateData);
      await principalQuery.refetch();

      alert("정보가 성공적으로 저장되었습니다.");
    } catch (error) {
      alert("정보 저장에 실패했습니다.");
      console.error(error);
    } finally {
      setIspatch(false);
    }
  };

  return (
    <>
      {!principalQuery.isLoading && (
        <div css={s.layout}>
          <div css={s.userInfoContainer}>
            <div css={s.titleLine}>
              <div css={s.title}>내 정보 관리</div>
              <Button
                onClick={handleUpdateUserOnClick}
                disabled={ispatch}
                >
                {ispatch ? "저장 중..." : "저장"}
              </Button>
              </div>
            <div css={s.profileSection}>
              <div css={s.profileImgBox} onClick={handleProfileImgUpdateClick}>
                <img src={userInfo?.picture} alt="profile" />
              </div>
            </div>
            <div css={s.nameNicknameRow}>
              <div css={s.nameField}>
                <label css={s.label}>이름</label>
                <div css={s.value}>{userInfo?.fullName}</div>
              </div>
              <div css={s.nicknameField}>
                <label css={s.label}>닉네임</label>
                <div css={s.inputRow}>
                  <input
                    type="text"
                    value={updateUser.nickname}
                    onChange={handleNicknameChange}
                    css={s.input}
                    autoFocus
                  />
                </div>
                {errors.nickname && <p css={s.errMsg}>{errors.nickname}</p>}
              </div>
              <div css={s.checkButtonWrapper}>
                <Button
                  onClick={handleNicknameCheck}
                  disabled={!updateUser.nickname.trim() || errors.nickname}
                >
                  {isNicknameChecked ? "사용 가능" : "중복 확인"}
                </Button>
              </div>
            </div>
            <div css={s.field}>
              <label css={s.label}>이메일</label>
              <div css={s.value}>{userInfo?.email}</div>
              <div css={s.subText}>{userInfo?.oauthType} 아이디로 가입한 유저</div>
            </div>
            <div css={s.field}>
              <label css={s.label}>생년월일</label>
              <div css={s.value}>{userInfo?.birthDate}</div>
            </div>
            <div css={s.field}>
              <label css={s.label}>성별</label>
              <div css={s.value}>
                {userInfo?.gender === 1 ? "남성" : "여성"}
              </div>
            </div>
            <div css={s.field}>
              <label css={s.label}>연락처</label>
              <input
                type="tel"
                value={updateUser.phoneNumber}
                onChange={handlePhoneChange}
                css={s.input}
              />
              {errors.phoneNumber && <p css={s.errMsg}>{errors.phoneNumber}</p>}
            </div>
            <div css={s.field}>
              <label css={s.label}>도시</label>
              <div css={s.value}>{userInfo?.address}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MypageModify;