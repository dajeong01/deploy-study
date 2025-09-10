/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import { FaHeart } from 'react-icons/fa';
import { motion } from "framer-motion";
import { getUserWishlist, removeWishlist } from '../../../api/Crew/wishlistApi';
import useGetMyCrewsQuery from '../../../queries/User/useGetMyCrewsQuery';

function Wishlist(props) {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const myCrewsQuery = useGetMyCrewsQuery(userId);
  const myCrews = myCrewsQuery?.data?.body || [];
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      if (userId) {
        try {
          setLoading(true);
          const response = await getUserWishlist(userId);
          setWishlistData(response.data.body || []);
        } catch (error) {
          console.error('위시리스트 불러오기 실패:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadWishlist();
  }, [userId]);

  const handleRemoveFromWishlist = async (e, crewId) => {
    e.stopPropagation();
    
    const mywish = {
      crewId: crewId,
      userId: userId
    };

    try {
      await removeWishlist(mywish);
      setWishlistData(prev => prev.filter(item => item.crewId !== crewId));
    } catch (error) {
      console.error('위시리스트 제거 실패:', error);
    }
  };

  const handleNavigateToCrewDetail = (crewId) => {
    navigate(`/crews/${crewId}`);
  };

  if (loading) {
    return (
      <div css={s.container}>
        <div css={s.headerBox}>위시리스트를 불러오는 중...</div>
      </div>
    );
  }

  const getRoleIcon = (roleName) => {
    if (roleName === "leader") return "👑";
    if (roleName === "support") return "⭐";
    return ""; // 일반유저는 아이콘 없음
  };

  return (
    <div css={s.container}>
      <div css={s.headerBox}>
        <h2>위시 리스트</h2>
      </div>
      
      {wishlistData.length === 0 ? (
        <div css={s.textBox}>
          <p>아직 위시리스트에 추가한 크루가 없습니다.</p>
          <p>마음에 드는 크루를 찾아 하트를 눌러보세요! ❤️</p>
        </div>
      ) : (
        <div css={s.gridBox}>
          {wishlistData.map((item) => (
            <div
              key={item.wishlistId}
              css={s.card}
              onClick={() => handleNavigateToCrewDetail(item.crewId)}
            >
              <div css={s.thumbnailBox}>
                <img 
                  src={item?.thumbnailPicture || '/default-crew-image.jpg'} 
                  alt={item?.crewName || '크루 이미지'}
                />
                <motion.div
                  css={s.heartIcon}
                  onClick={(e) => handleRemoveFromWishlist(e, item.crewId)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart />
                </motion.div>
              </div>
              <div css={s.textBox}>
                <div css={s.gungu}>{item?.gunguName}</div>
                <div css={s.crewName}>[{item?.crewName}]</div>
                <div css={s.crewTitle}>{item?.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div css={s.headerBox}>
        <h2>나의 크루 리스트</h2>
      </div>
      
      {myCrews.length === 0 ? (
        <div css={s.textBox}>
          <p>아직 가입된 크루가 없습니다.</p>
        </div>
      ) : (
        <div css={s.gridBox}>
          {myCrews.map((item) => (
            <div
              key={item?.crewId}
              css={s.card}
              onClick={() => handleNavigateToCrewDetail(item.crewId)}
            >
              <div css={s.thumbnailBox}>
                <img 
                  src={item?.thumbnailPicture || '/default-crew-image.jpg'} 
                  alt={item?.crewName || '크루 이미지'}
                />
                <motion.div
                  css={s.heartIcon}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getRoleIcon(item?.roleName)}
                </motion.div>
              </div>
              <div css={s.textBox}>
                <div css={s.gungu}>{item?.gunguName}</div>
                <div css={s.crewName}>[{item?.crewName}]</div>
                <div css={s.crewTitle}>{item?.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
