import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  SIGNUP_REGEX,
  SIGNUP_REGEX_ERROR_MESSAGE,
} from "../../../constants/signupRegex";
import { reqCheckNickname, reqRegisterUser } from "../../../api/User/UserApi";

function Signup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const providerId = searchParams.get("providerId");
  const oauthType = searchParams.get("oauthType");
  const paramBirthDate = searchParams.get("birthDate");
  const img = searchParams.get("img");

  const checkBirthDate = paramBirthDate && paramBirthDate !== "null";

  const [user, setUser] = useState({
    nickname: "",
    name: "",
    phoneNumber: "",
    gender: "",
    address: "",
    selectedYear: "",
    selectedMonth: "",
    selectedDay: "",
    isNicknameChecked: false,
  });

  const [errors, setErrors] = useState({
    nickname: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const currentYear = new Date().getFullYear();
  const BIRTHDAY_YEAR_LIST = Array.from(
    { length: 51 },
    (_, i) => currentYear - 50 + i
  );
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);

  const updateUser = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    updateUser("nickname", value);
    updateUser("isNicknameChecked", false);
    const errorMsg = validateField("nickname", value);
    setErrors((prev) => ({ ...prev, nickname: errorMsg }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    updateUser("phoneNumber", value);
    const errorMsg = validateField("phoneNumber", value);
    setErrors((prev) => ({ ...prev, phoneNumber: errorMsg }));
  };

  const handleCheckNickname = async () => {
    if (!user.nickname.trim()) return;
    try {
      const response = await reqCheckNickname(user.nickname);
      const isAvailable = response.data.body === "false";
      if (isAvailable) {
        updateUser("isNicknameChecked", true);
        alert("사용 가능한 닉네임입니다!");
      } else {
        alert("중복된 닉네임입니다.");
      }
    } catch {
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.roadAddress ? data.roadAddress : data.jibunAddress;
        updateUser("zipcode", data.zonecode);
        updateUser("address", addr);
        updateUser("detailAddress", "");
        document.getElementById("detailAddress").focus();
      },
    }).open();
  };

  const handleOnRegisterUser = async () => {
    let birthDate = null;

    if (checkBirthDate) {
      birthDate = paramBirthDate;
    } else {
      if (!user.selectedYear || !user.selectedMonth || !user.selectedDay) {
        alert("생년월일을 모두 선택해주세요.");
        return;
      }
      birthDate = `${user.selectedYear}-${user.selectedMonth.padStart(2, "0")}-${user.selectedDay.padStart(2, "0")}`;
    }

    const regUser = {
      oauthType,
      providerId,
      email,
      profilePicture: img,
      fullName: user.name,
      nickname: user.nickname,
      phoneNumber: user.phoneNumber,
      birthDate,
      gender: parseInt(user.gender),
      address: user.address,
    };

    try {
      const result = await reqRegisterUser(regUser);
      const accessToken = result?.data?.body?.accessToken;

      if (accessToken) {
        const bearerToken = `Bearer ${accessToken}`;
        localStorage.setItem("AccessToken", bearerToken);
        await queryClient.invalidateQueries({ queryKey: ["principal"] });
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      } else {
        alert("회원가입은 되었지만 토큰 발급에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const isNicknameValid = SIGNUP_REGEX.nickName.test(user.nickname);
  const isPhoneNumberValid = SIGNUP_REGEX.phoneNumber.test(user.phoneNumber);

  const isUserValid = () => {
    const basicFields = [
      user.name.trim(),
      user.isNicknameChecked,
      isNicknameValid,
      isPhoneNumberValid,
      user.gender,
      user.address.trim(),
    ];

    const birthdateValid = checkBirthDate || 
      (user.selectedYear && user.selectedMonth && user.selectedDay);

    return basicFields.every(Boolean) && birthdateValid;
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <div>
        <div>
          <img src={img} alt="" />
        </div>
      </div>

      <div>
        <h3>이메일</h3>
        <input disabled value={email} />
      </div>

      <div>
        <h3>이름</h3>
        <input
          value={user.name}
          onChange={(e) => updateUser("name", e.target.value)}
        />
      </div>

      <div>
        <h3>닉네임</h3>
        <input
          type="text"
          value={user.nickname}
          onChange={handleNicknameChange}
          required
        />
        <button onClick={handleCheckNickname} disabled={!user.nickname.trim()}>
          {user.isNicknameChecked ? "❤️ 사용 가능!" : "닉네임 중복 확인"}
        </button>
        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname}</p>}
      </div>

      <div>
        <h3>전화번호</h3>
        <input
          type="tel"
          value={user.phoneNumber}
          onChange={handlePhoneChange}
          required
        />
        {errors.phoneNumber && (
          <p style={{ color: "red" }}>{errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <h3>성별</h3>
        <select
          value={user.gender}
          onChange={(e) => updateUser("gender", e.target.value)}
          required
        >
          <option value="">선택하세요</option>
          <option value="1">남자</option>
          <option value="2">여자</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          value={user.zipcode}
          readOnly
          placeholder="우편번호"
        />
        <button type="button" onClick={handlePostcode}>
          주소 검색
        </button>

        <input
          type="text"
          value={user.address}
          readOnly
          placeholder="기본주소"
        />
        <input
          type="text"
          id="detailAddress"
          value={user.detailAddress}
          onChange={(e) => updateUser("detailAddress", e.target.value)}
          placeholder="상세주소"
        />
      </div>

      <div>
        <h3>생일</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {paramBirthDate !== "null"
            ? <input type="text" value={paramBirthDate} disabled /> 
            : (
            <>
              <select
                value={user.selectedYear}
                onChange={(e) => updateUser("selectedYear", e.target.value)}
                required
              >
                <option value="">년도</option>
                {BIRTHDAY_YEAR_LIST.map((year) => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>

              <select
                value={user.selectedMonth}
                onChange={(e) => updateUser("selectedMonth", e.target.value)}
                required
              >
                <option value="">월</option>
                {BIRTHDAY_MONTH_LIST.map((month) => (
                  <option key={month} value={month}>{month}월</option>
                ))}
              </select>

              <select
                value={user.selectedDay}
                onChange={(e) => updateUser("selectedDay", e.target.value)}
                required
              >
                <option value="">일</option>
                {BIRTHDAY_DAY_LIST.map((day) => (
                  <option key={day} value={day}>{day}일</option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleOnRegisterUser}
        disabled={!isUserValid()}
      >
        회원가입 완료
      </button>
    </div>
  );
}

export default Signup;
