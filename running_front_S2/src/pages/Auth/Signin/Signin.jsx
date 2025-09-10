/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../../../api/axios";

function Signin() {
  const handleLogin = (provider) => {
    window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
  };

  const navigate = useNavigate("");
  const [searchParams] = useSearchParams();
  const [isAccessToken, setIsAccessToken] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
      setIsAccessToken(accessToken);

      queryClient
        .invalidateQueries({
          queryKey: ["principal"],
        })
        .then(() => {
          navigate("/");
        });
    }
  }, []);

  return (
    <div css={s.container}>
      <div css={s.loginTitle}>S2BestTeam</div>
      <div css={s.buttons}>
        <button onClick={() => handleLogin("google")}>
          <FcGoogle />
          구글 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("kakao")}>
          <RiKakaoTalkFill />
          카카오 계정으로 로그인
        </button>
        <button onClick={() => handleLogin("naver")}>
          <SiNaver />
          네이버 계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default Signin;
