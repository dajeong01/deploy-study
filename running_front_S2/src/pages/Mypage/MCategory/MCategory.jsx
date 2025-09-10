/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { reqDeleteUser } from '../../../api/User/UserApi';
import ContentLayout from '../../../components/ContentLayout/ContentLayout';
import LeftSideBarLayout from '../../../components/LeftSideBarLayout/LeftSideBarLayout';
import MainContainer from '../../../components/MainContainer/MainContainer';
import useGetCrewRoleQuery from '../../../queries/Crew/useGetCrewRoleQuery';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import MyPageRoute from '../../../routes/MyPageRoute';
import { useCrewStore } from '../../../stores/useCrewStroes';
import * as s from './styles';

function MCategory(props) {
  const navigate = useNavigate();
  const { crewId } = useCrewStore();
  const principal = usePrincipalQuery();
  const user = principal?.data?.data?.body?.user;
  const userId = principal?.data?.data?.body?.user?.userId;
  const CrewRoleQuery = useGetCrewRoleQuery(userId);

  const isUserLeader = CrewRoleQuery?.data?.some((role) => role.userId === userId && role.roleId === 1);
  const showDeleteButton = !!isUserLeader;

  const handleDeleteUserOnClick = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        await reqDeleteUser(userId);
        const accessToken = localStorage.getItem("AccessToken");
        if (accessToken) {
          localStorage.removeItem("AccessToken");
          queryClient.clear();
        }
        alert('탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.');
        navigate('/');
      } catch (error) {
        alert('탈퇴 처리 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
  }

  const profileSection = (
    <div css={s.userSimpleInfo} onClick={() => navigate(`/mypage`)}>
      <div css={s.profileImgBox}>
        <img src={user?.picture} alt="프로필 이미지" />
      </div>
      <div>
        <div css={s.nick}>{user?.nickname}</div>
        <div css={s.email}>{user?.email}</div>
      </div>
    </div>
  );

  const navigationButtons = (
    <>
      <button onClick={() => navigate("/mypage/welcome")}>크루 신청 내역</button>
      <button onClick={() => navigate("/mypage/wish")}>나의 크루</button>
      <button onClick={() => navigate("/mypage/post")}>내가 쓴 글</button>
      <button onClick={() => navigate("/mypage/gathering")}>나의 정모일정</button>
      <button onClick={() => navigate("/mypage/ask")}>나의 문의 사항</button>
    </>
  );

  const bottomSection = (
    <div css={s.getout}>
      {
        showDeleteButton ?
        (<div style={{fontSize : '1.2rem', color : 'gray'}}>크루장님은 크루를 해체한 후 탈퇴할 수 있습니다.</div>)
        :
        (<button onClick={handleDeleteUserOnClick}>탈퇴하기</button>)
      }
    </div>
  );

  return (
    <MainContainer>
      <LeftSideBarLayout
        profileSection={profileSection}
        navigationButtons={navigationButtons}
        bottomSection={bottomSection}
      >
        <ContentLayout>
          {MyPageRoute()}
        </ContentLayout>
      </LeftSideBarLayout>
    </MainContainer>
  );
}

export default MCategory