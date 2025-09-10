/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useCrewStore } from '../../../stores/useCrewStroes';
import useGetCrewMessage from '../../../queries/Crew/Message/useGetCrewMessageQuery';

export default function Message() {
  const { crewId } = useCrewStore();
  const { data: messages = [], isLoading, isError, error, refetch } = useGetCrewMessage(crewId);

  if (isLoading) {
    return (
      <div css={s.mainBox}>
        <div css={s.loadingMessage}>메시지를 불러오는 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div css={s.mainBox}>
        <div css={s.errorMessage}>메시지 로드 실패: {String(error?.message ?? "알 수 없는 오류")}</div>
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div css={s.mainBox}>
        <h2>관리자 메시지</h2>
        <div css={s.emptyMessage}>수신한 메시지가 없습니다.</div>
      </div>
    );
  }

  return (
    <div css={s.mainBox}>
      <h2>관리자 메시지</h2>
      <table css={s.table}>
        <thead>
          <tr>
            <th css={s.th}>발신자</th>
            <th css={s.th}>메시지 내용</th>
            <th css={s.th}>수신일</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, index) => (
            <tr key={m.messageId}>
              <td css={s.td}>관리자</td>
              <td css={[s.td, s.messageContent]}>{m?.content ?? ""}</td>
              <td css={s.td}>{new Date(m.createdAt).toLocaleDateString("ko-KR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}