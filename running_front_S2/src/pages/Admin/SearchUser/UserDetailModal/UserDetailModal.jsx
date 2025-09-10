/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import useGetMyCrewsQuery from "../../../../queries/User/useGetMyCrewsQuery";
import useGetMyGatheringQuery from "../../../../queries/User/useGetMyGatheringQuery";
import { reqCheckNickname, reqDeleteUser, reqUserInfoUpdate, reqUserProfileUpdate } from "../../../../api/User/UserApi";
import { SIGNUP_REGEX, SIGNUP_REGEX_ERROR_MESSAGE } from "../../../../constants/signupRegex";
import { reqReportDelete, reqUserReported } from "../../../../api/Admin/adminApi";
import useGetUserPostQuery from "../../../../queries/Admin/useGetUserPostQuery";
import Pagination from "../../../../components/Pagination/Pagination";
import { MenuItem, Select } from "@mui/material";
import Button from "../../../../components/Button/Button";

const SRC_OPTIONS = [
  { value: "", label: "전체" },
  { value: "global_free", label: "전체 자유" },
  { value: "global_notice", label: "전체 공지" },
  { value: "crew_free", label: "크루 자유" },
  { value: "crew_notice", label: "크루 공지" },
];

function buildPostUrl({ src, postId, crewId }) {
  if (!src || postId == null) return null;
  switch (src) {
    case "global_free":
      return `/free/${postId}`;
    case "global_notice":
      return `/notice/${postId}`;
    case "crew_free":
      return crewId ? `/crews/${crewId}/freeBoards/${postId}` : null;
    case "crew_notice":
      return crewId ? `/crews/${crewId}/notices/${postId}` : null;
    default:
      return null;
  }
}

function srcLabel(v) {
  return SRC_OPTIONS.find((o) => o.value === v)?.label ?? v ?? "";
}

function UserDetailModal({ user, onClose, onSave }) {
  if (!user) return null;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("crews");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [reports, setReports] = useState({ madeReports: [], receivedReports: [] });
  useEffect(() => {
    (async () => {
      try {
        const res = await reqUserReported(user.userId);
        setReports(res?.data?.body ?? { madeReports: [], receivedReports: [] });
      } catch (e) {
        console.error("신고 내역 불러오기 실패", e);
      }
    })();
  }, [user.userId]);
  
  const [updateUser, setUpdateUser] = useState({
    userId: user.userId,
    picture: user.picture,
    fullName: user.fullName,
    email: user.email,
    address: user.address,
    nickname: user.nickname || "",
    phoneNumber: user.phoneNumber || "",
  });
  
  const [isNicknameChecked, setIsNicknameChecked] = useState(true);
  const [errors, setErrors] = useState({ nickname: "", phoneNumber: "" });
  
  const userCrewsQuery = useGetMyCrewsQuery(user.userId);
  const userGatheringQuery = useGetMyGatheringQuery(user.userId);
  const myCrews = userCrewsQuery?.data?.body || [];
  const myGatherings = userGatheringQuery?.data?.body || [];
  
  const handleProfileImgUpdateClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append("profileFile", file);
        await reqUserProfileUpdate(user.userId, formData);
        alert("프로필 사진 변경이 저장되었습니다.");
      } catch (err) {
        console.error(err);
        alert("프로필 사진 변경에 실패했습니다.");
      }
    };
    input.click();
  };
  
  const validateField = (name, value) => {
    if (name === "nickname") {
      if (!SIGNUP_REGEX.nickName.test(value)) return SIGNUP_REGEX_ERROR_MESSAGE.nickName;
      return "";
    }
    if (name === "phoneNumber") {
      if (!SIGNUP_REGEX.phoneNumber.test(value)) return SIGNUP_REGEX_ERROR_MESSAGE.phoneNumber;
      return "";
    }
    return "";
  };
  
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setUpdateUser((p) => ({ ...p, nickname: value }));
    setIsNicknameChecked(value === user.nickname);
    setErrors((p) => ({ ...p, nickname: validateField("nickname", value) }));
  };
  
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setUpdateUser((p) => ({ ...p, phoneNumber: value }));
    setErrors((p) => ({ ...p, phoneNumber: validateField("phoneNumber", value) }));
  };
  

  const handleNicknameCheck = async () => {
    const nickname = updateUser.nickname.trim();
    if (!nickname) return;
    if (nickname === user.nickname) {
      setIsNicknameChecked(true);
      alert("현재 사용 중인 닉네임입니다.");
      return;
    }
    try {
      const res = await reqCheckNickname(nickname);
      const isAvailable = res?.data?.body === "false";
      if (isAvailable) {
        setIsNicknameChecked(true);
        alert("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameChecked(false);
        alert("중복된 닉네임입니다.");
      }
    } catch (e) {
      console.error(e);
      alert("중복확인 중 오류가 발생했습니다.");
    }
  };

  const validateAll = () => {
    const nicknameError = validateField("nickname", updateUser.nickname);
    const phoneError = validateField("phoneNumber", updateUser.phoneNumber);
    setErrors({ nickname: nicknameError, phoneNumber: phoneError });

    if (updateUser.nickname !== user.nickname && !isNicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return false;
    }
    return !nicknameError && !phoneError;
  };

  const hasChanges = () =>
    updateUser.nickname !== user.nickname || updateUser.phoneNumber !== user.phoneNumber;

  const handleSave = async () => {
    if (!validateAll()) return;
    if (!hasChanges()) {
      alert("변경된 내용이 없습니다.");
      return;
    }
    setIsSaving(true);
    try {
      await reqUserInfoUpdate(updateUser);
      queryClient.invalidateQueries(["searchUser", user.userId]);
      alert("유저 정보가 성공적으로 저장되었습니다.");
      onSave && onSave(updateUser);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("정보 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setUpdateUser({
      userId: user.userId,
      picture: user.picture,
      fullName: user.fullName,
      email: user.email,
      address: user.address,
      nickname: user.nickname || "",
      phoneNumber: user.phoneNumber || "",
    });
    setErrors({ nickname: "", phoneNumber: "" });
    setIsEditing(false);
  };

  const handleReportDeleteOnClick = async (reportId) => {
    try {
      await reqReportDelete(reportId);
      alert("신고 내역이 삭제되었습니다.");
      const res = await reqUserReported(user.userId);
      setReports(res?.data?.body ?? { madeReports: [], receivedReports: [] });
    } catch (e) {
      console.error("신고 삭제 오류:", e);
      alert("신고 삭제에 실패했습니다.");
    }
  };

  const handleUserDeleteOnClick = async (e, userId) => {
    e.stopPropagation();
    if (!window.confirm("정말 추방시겠습니까?")) return;
    try {
      await reqDeleteUser(userId);
      alert("유저를 추방시켰습니다.");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("추방 처리 중 오류가 발생했습니다.");
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = 10;
  const src = searchParams.get("src") || "";
  const crewId = searchParams.get("crewId") || "";
  const searchText = searchParams.get("searchText") || "";
  const [searchInput, setSearchInput] = useState(searchText);

  const { data, isLoading, isError } = useGetUserPostQuery({
    page,
    size,
    searchText,
    src,
    crewId: crewId || "",
    userId: user.userId,
  });

  const body = data?.data?.body ?? data?.body ?? data ?? {};
  const totalPages = body?.totalPages ?? 1;
  const totalElements = body?.totalElements ?? 0;


  const contents = useMemo(() => {
    const base = body?.contents ?? body?.items ?? [];
    return (Array.isArray(base) ? base : []).filter((p) => p && p.postId != null);
  }, [body]);

  const start = (page - 1) * size;

  const handleSearchOnClick = () => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      next.set("page", "1");
      next.set("searchText", searchInput);
      next.set("src", src);
      if (crewId) next.set("crewId", crewId);
      else next.delete("crewId");
      return next;
    });
  };

  const handleSrcChange = (e) => {
    const nextVal = e.target.value;
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      next.set("page", "1");
      next.set("src", nextVal);
      if (searchInput || searchText) next.set("searchText", searchInput || searchText);
      if (crewId) next.set("crewId", crewId);
      return next;
    });
  };

  const handleCrewChange = (e) => {
    const nextVal = e.target.value;
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      next.set("page", "1");
      next.set("src", src);
      if (nextVal) next.set("crewId", nextVal);
      else next.delete("crewId");
      if (searchInput || searchText) next.set("searchText", searchInput || searchText);
      return next;
    });
  };

  const goPage = (next) => {
    const nextPage = Math.min(Math.max(1, next), Math.max(1, totalPages));
    setSearchParams((p) => {
      const params = new URLSearchParams(p);
      params.set("page", String(nextPage));
      params.set("src", src);
      if (crewId) params.set("crewId", crewId);
      else params.delete("crewId");
      if (searchText) params.set("searchText", searchText);
      else params.delete("searchText");
      return params;
    });
  };

  const closeAndRefresh = () => {
    onClose(); 
  };

  return (
    <div css={s.overlay}>
      <div css={s.modal}>
        <div css={s.editIcon}>
          <FaPen css={s.IconButton} size={18} onClick={() => setIsEditing(true)} />
          <MdDelete
            css={s.IconButton}
            size={22}
            onClick={(e) => handleUserDeleteOnClick(e, user.userId)}
          />
        </div>

        <div css={s.profileSection}>
          <div css={s.profileImageWrapper} onClick={handleProfileImgUpdateClick}>
            <img src={user.picture} alt={user.fullName} css={s.profileImage} />
          </div>

          <div>
            {isEditing ? (
              <>
                <p><b>성명:</b> {user.fullName}</p>
                <p>
                  <b>닉네임:</b>{" "}
                  <input
                    name="nickname"
                    value={updateUser.nickname}
                    onChange={handleNicknameChange}
                  />
                  {errors.nickname && <p css={s.nicknameErrMsg}>{errors.nickname}</p>}
                  <button
                    onClick={handleNicknameCheck}
                    disabled={!updateUser.nickname.trim() || !!errors.nickname}
                  >
                    {isNicknameChecked ? "❤️ 사용 가능!" : "중복 확인"}
                  </button>
                </p>
                <p><b>이메일:</b> {user.email}</p>
                <p><b>주소:</b> {user.address}</p>
                <p>
                  <b>전화번호:</b>{" "}
                  <input
                    name="phoneNumber"
                    value={updateUser.phoneNumber}
                    onChange={handlePhoneChange}
                  />
                  {errors.phoneNumber && <p css={s.errMsg}>{errors.phoneNumber}</p>}
                </p>

                <div css={s.editButtons}>
                  <button css={s.cancelButton} onClick={handleCancel}>취소</button>
                  <button css={s.saveButton} onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "저장 중..." : "저장"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p><b>성명:</b> {user.fullName}</p>
                <p><b>닉네임:</b> {user.nickname}</p>
                <p><b>이메일:</b> {user.email}</p>
                <p><b>주소:</b> {user.address}</p>
                <p><b>전화번호:</b> {user.phoneNumber}</p>
              </>
            )}
          </div>
        </div>

        <div css={s.tabMenu}>
          {["crews", "gatherings", "report", "posts"].map((tab) => (
            <div
              key={tab}
              css={[s.tab, activeTab === tab && s.activeTab]}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "crews" && "가입된 크루"}
              {tab === "gatherings" && "참여한 일정"}
              {tab === "report" && "신고 이력"}
              {tab === "posts" && "작성한 글"}
            </div>
          ))}
        </div>

        <div css={s.tabContent}>
          {activeTab === "crews" &&
            (myCrews.length > 0 ? (
              <div css={s.cardWrapper}>
                {myCrews.map((crew) => (
                  <div key={crew?.crewId} css={s.card}>
                    <p><b>크루 이름:</b> {crew?.crewName}</p>
                    <p><b>권한:</b> {crew?.roleName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>가입된 크루가 없습니다.</p>
            ))}

          {activeTab === "gatherings" &&
            (myGatherings.length > 0 ? (
              <div css={s.gatheringWrapper}>
                {myGatherings.map((event, idx) => (
                  <div key={idx} css={s.gatheringCard}>
                    <p><b>크루:</b> {event?.crewName}</p>
                    <p><b>제목:</b> {event?.title}</p>
                    <p><b>날짜/시간:</b> {event?.runningDate} {event?.runningTime}</p>
                    <p><b>장소:</b> {event?.placeName}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>참여한 일정이 없습니다.</p>
            ))}

          {activeTab === "report" && (
            <div>
              <h3>📌 내가 신고한 내역</h3>
              {reports.madeReports?.length > 0 ? (
                <ul css={s.reportList}>
                  {reports.madeReports.map((r) => (
                    <li key={r.reportId} css={s.reportItem}>
                      <div css={s.reportContent}>
                        <div css={s.reportMain}>
                          <span css={s.reportReason}>{r.reason}</span>
                          <span css={s.reportTarget}>→ {r.reportedMemberName}</span>
                        </div>
                        <span css={s.reportDate}>
                          {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                          <MdDelete css={s.IconButton} onClick={() => handleReportDeleteOnClick(r.reportId)} />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>📭 내가 신고한 내역이 없습니다.</p>
              )}

              <h3>📌 내가 신고당한 내역</h3>
              {reports.receivedReports?.length > 0 ? (
                <ul css={s.reportList}>
                  {reports.receivedReports.map((r) => (
                    <li key={r.reportId} css={s.reportItem}>
                      <div css={s.reportContent}>
                        <div css={s.reportMain}>
                          <span css={s.reportReason}>{r.reason}</span>
                          <span css={s.reportTarget}>← {r.reportMemberName}</span>
                        </div>
                        <span css={s.reportDate}>
                          {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                          <MdDelete css={s.deleteButton} onClick={() => handleReportDeleteOnClick(r.reportId)} />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>📭 내가 신고당한 내역이 없습니다.</p>
              )}
            </div>
          )}

          {activeTab === "posts" && (
            <>
              {isLoading && <div>불러오는 중…</div>}
              {isError && <div>문제가 발생했어요.</div>}

              {!isLoading && !isError && (
                <>
                  <div css={s.searchBox}>
                    <div css={s.inputGroup}>
                      <div css={s.selectGroup}>
                        <Select
                          css={s.selectBox}
                          value={src}
                          onChange={handleSrcChange}
                          displayEmpty
                          MenuProps={{
                            disablePortal: true,
                            PaperProps: {
                              sx: { maxHeight: 300, zIndex: 2000 }
                            }
                          }}
                        >
                            {SRC_OPTIONS.map((op) => (
                              <MenuItem
                                key={op.value}
                                value={op.value}
                                css={s.menuItem}
                              >
                                {op.label}
                              </MenuItem>
                            ))}
                        </Select>
                        <Select
                          css={s.selectBox}
                          value={crewId}
                          onChange={handleCrewChange}
                          displayEmpty
                          MenuProps={{
                            disablePortal: true,
                            PaperProps: {
                              sx: { maxHeight: 300, zIndex: 2000 }
                            }
                          }}
                        >
                          <MenuItem value="" css={s.menuItem}>내 크루: 전체</MenuItem>
                          {myCrews.map((c) => (
                              <MenuItem
                                key={c.crewId}
                                value={String(c.crewId)}
                                css={s.menuItem}
                              >
                                {c.crewName ?? `Crew #${c.crewId}`}
                              </MenuItem>
                            ))}
                        </Select>
                      </div>

                      <div css={s.asd}>
                        <input
                          type="text"
                          placeholder="제목/내용 검색"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          css={s.searchInput}
                          onKeyDown={(e) => e.key === "Enter" && handleSearchOnClick()}
                        />
                        <button css={s.searchButton} onClick={handleSearchOnClick}>
                          <IoSearch />
                        </button>
                      </div>
                    </div>
                  </div>

                  <table css={s.table}>
                    <thead>
                      <tr>
                        <th css={s.th}>번호</th>
                        <th css={s.th}>분야</th>
                        <th css={s.th}>제목</th>
                        <th css={s.th}>크루</th>
                        <th css={s.th}>등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contents.map((item, index) => (
                        <tr
                          key={`${item.src}-${item.postId}`}
                          css={s.tr}
                          onClick={() => {
                            const url = buildPostUrl(item);
                            if (url) navigate(url);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <td css={s.td}>{totalElements - (start + index)}</td>
                          <td css={s.td}>{srcLabel(item.src)}</td>
                          <td css={s.tdTitle}>{item.title}</td>
                          <td css={s.td}>{item.crew.crewName ?? "-"}</td>
                          <td css={s.td}>{new Date(item.createdAt).toLocaleDateString("ko-KR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onChange={(p) => goPage(p)}
                    windowSize={1}
                  />
                  {contents.length === 0 && <p>작성한 글이 없습니다.</p>}
                </>
              )}
            </>
          )}
        </div>

        <div css={s.footer}>
          <Button onClick={closeAndRefresh}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;
