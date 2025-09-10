export const SIGNUP_REGEX = {
  nickName: /^[a-zA-Z0-9가-힣]{2,15}$/,
  phoneNumber: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
  notEmpty: /^.+$/,
};

export const SIGNUP_REGEX_ERROR_MESSAGE = {
  nickName: "닉네임은 2~15자의 한글, 영어, 숫자만 가능합니다.",
  phoneNumber: "올바른 전화번호 형식이어야 합니다. 예) 010-1234-5678",
  gender: "성별을 선택해주세요.",
  gunguId: "구/군을 선택해주세요.",
  birthDate: "생년월일을 모두 선택해주세요.",
};