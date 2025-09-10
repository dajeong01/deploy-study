/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useState } from "react";
import { reqDeleteMyWelcome, reqMyWelcome, reqUpdateMyWelcome } from "../../../api/Crew/welcomeApi";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";

function Welcome() {
  const [myWelcomes, setMyWelcomes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const principalQuery = usePrincipalQuery();
  const userId = principalQuery.data?.data?.body?.user.userId;

  const fetchWelcomes = () => {
    if (!userId) return;
    reqMyWelcome(userId)
      .then((res) => setMyWelcomes(res?.data?.body || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchWelcomes();
  }, [userId]);

  const handleEdit = (welcome) => {
    setEditingId(welcome.welcomeId);
    setEditContent(welcome.content);
  };

  const handleModifyMyWelcomeOnClick = (welcomeId) => {
    const updateData = {
      welcomeId : welcomeId,
      userId : userId,
      content: editContent
    }

    reqUpdateMyWelcome(updateData)
      .then(() => {
        fetchWelcomes();
        setEditingId(null);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMyWelcomeOnClick = (welcomeId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    reqDeleteMyWelcome(welcomeId)
      .then(() => fetchWelcomes())
      .catch((err) => console.error(err));
  };

  return (
    <div css={s.container}>
      <h2>크루 신청 내역</h2>
      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>No.</th>
            <th css={s.th}>크루</th>
            <th css={s.th}>가입 인사</th>
            <th css={s.th}>요청 상태</th>
            <th css={s.th}>작성일</th>
            <th css={s.th}>변경</th>
          </tr>
        </thead>
        <tbody>
          {myWelcomes.map((welcome, index) => (
            <tr key={welcome.welcomeId}>
              <td css={s.td}>{index + 1}</td>
              <td css={s.td}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src={welcome.profilePicture}
                    alt="크루 프로필 이미지"
                    css={s.crewImg}
                  />
                  {welcome.crewName}
                </div>
              </td>
              <td css={s.td}>
                {editingId === welcome.welcomeId ? (
                  <input
                    type="text"
                    placeholder={welcome.content}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  welcome.content
                )}
              </td>
              <td css={s.td}>{welcome.status}</td>
              <td css={s.td}>
                {new Date(welcome.createdAt).toLocaleDateString("ko-KR")}
              </td>
              <td css={s.td}>
                {welcome.status === "대기중" && (
                  editingId === welcome.welcomeId ? (
                    <>
                      <button
                        css={s.actionButtonStyle}
                        onClick={() => handleModifyMyWelcomeOnClick(welcome.welcomeId)}
                      >
                        저장
                      </button>
                      <button css={s.expelButtonStyle} onClick={() => setEditingId(null)}>취소</button>
                    </>
                  ) : (
                    <>
                      <button
                        css={s.actionButtonStyle}
                        onClick={() => handleEdit(welcome)}
                      >
                        수정
                      </button>
                      <button
                        css={s.expelButtonStyle}
                        onClick={() => handleDeleteMyWelcomeOnClick(welcome.welcomeId)}
                      >
                        삭제
                      </button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Welcome;
