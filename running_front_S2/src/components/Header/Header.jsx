/** @jsxImportSource @emotion/react */
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import usePrincipalQuery from "../../queries/User/usePrincipalQuery";

function Header() {
  const principalQuery = usePrincipalQuery();
  const queryClient = useQueryClient();
  const userInfo = principalQuery?.data?.data?.body?.user;

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem("AccessToken");
    handleNavigate(accessToken ? "/mypage" : "/auth/oauth2/signin");
  };

  const handleLogout = () => {
    const accessToken = localStorage.getItem("AccessToken");
    if (!accessToken) return alert("로그인 상태가 아닙니다.");

    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("AccessToken");
      queryClient.clear();
      handleNavigate("/");
      alert("로그아웃되었습니다.");
    }
  };

  const handleAdminPageOnClick = () => handleNavigate("/admin");

  return (
    <header css={s.header}>
      <div css={s.logo} onClick={() => handleNavigate("/")}>
        S2BestTeam
      </div>

      <nav
        css={s.nav}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(true)}
      >
        <ul css={s.menu}>
          <li>
            <a>크루정보</a>
          </li>
          <li>
            <a>랭킹정보</a>
          </li>
          <li>
            <a>커뮤니티</a>
          </li>
          <li>
            <a>대회일정</a>
          </li>
          <li>
            <a>고객센터</a>
          </li>
        </ul>
      </nav>

      {showDropdown && (
        <div
          css={s.fullDropdown}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div css={s.menuDetail}>
            <div>크루정보</div>
            <div onClick={() => handleNavigate("/crew/register")}>크루등록</div>
            <div onClick={() => handleNavigate("/crews")}>지역별 크루</div>
          </div>
          <div css={s.menuDetail}>
            <div>랭킹정보</div>
            <div onClick={() => handleNavigate("/crewRanking")}>크루랭킹</div>
            <div onClick={() => handleNavigate("/userRanking")}>개인랭킹</div>
          </div>
          <div css={s.menuDetail}>
            <div>커뮤니티</div>
            <div onClick={() => handleNavigate("/free")}>자유게시판</div>
          </div>
          <div css={s.menuDetail}>
            <div>대회정보</div>
            <div onClick={() => handleNavigate("/competition")}>대회일정</div>
            <div onClick={() => handleNavigate("/calender")}>캘린더</div>
          </div>
          <div css={s.menuDetail}>
            <div>고객센터</div>
            <div onClick={() => handleNavigate("/notice")}>공지사항</div>
            <div onClick={() => handleNavigate("/ask")}>러너의 소리</div>
          </div>
        </div>
      )}

      <div css={s.icons}>
        {userInfo?.role === "ROLE_ADMIN" && (
          <div css={s.icon} onClick={handleAdminPageOnClick}>
            <Settings />
          </div>
        )}
        <div css={s.icon} onClick={handleProfileClick}>
          {userInfo?.picture ? (
            <div css={s.profileImgBox}>
              <img src={userInfo.picture} alt="프로필 이미지" />
            </div>
          ) : (
            <FiUser />
          )}
        </div>
        {
          userInfo && 
          (
            <div css={s.icon} onClick={handleLogout}>
              <TbLogout />
            </div>
          )
        }
      </div>
    </header>
  );
}

export default Header;
