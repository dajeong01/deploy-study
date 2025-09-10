/** @jsxImportSource @emotion/react */
import { MenuItem, Select } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addWishlist, getUserWishlist, removeWishlist } from "../../../api/Crew/wishlistApi";
import Button from "../../../components/Button/Button";
import MainContainer from "../../../components/MainContainer/MainContainer";
import SearchBox from "../../../components/SearchBox/SearchBox";
import useGetCrewListQuery from "../../../queries/Crew/List/useGetCrewListQuery";
import useGetCrewRankingQuery from "../../../queries/Ranking/useGetCrewRankingQuery";
import useGetGunguListQuery from "../../../queries/User/useGetGunguListQuery";
import usePrincipalQuery from "../../../queries/User/usePrincipalQuery";
import { useCrewStore } from "../../../stores/useCrewStroes";
import * as s from "./styles";

function List() {
  const navigate = useNavigate();
  const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchText = searchParams.get("searchText") || "";
  const selectedGunguId = searchParams.get("gunguId") || "";
  const [wishlist, setWishlist] = useState([]);
  const [searchInput, setSearchInput] = useState(searchText);
  const rankingsQuery = useGetCrewRankingQuery();
  const { resetCrew } = useCrewStore();

  const top5Member = rankingsQuery?.data?.memberRanking.slice(0, 5).map(m => m.crewId);
  const top5CreatedAt = rankingsQuery?.data?.newRanking.slice(0, 5).map(m => m.crewId);
  const crewListQuery = useGetCrewListQuery({
    page,
    size: 15,
    searchText,
    gunguId: selectedGunguId,
  });

  const gunguQuery = useGetGunguListQuery();
  const gunguList = gunguQuery?.data?.data?.body || [];

  const [crewList, setCrewList] = useState([]);

  useEffect(() => {
    const loadUserWishlist = async () => {
      if (userId) {
        try {
          const response = await getUserWishlist(userId);
          const crewIds = response.data.body.map((wish) => wish.crewId);
          setWishlist(crewIds);
        } catch (error) {
          console.error("위시리스트 불러오기 실패:", error);
        }
      }
    };

    loadUserWishlist();
  }, [userId]);

  useEffect(() => {
    return () => {
      resetCrew();
    };
  }, [resetCrew]);

  const handleLike = async (e, crewId) => {
    e.stopPropagation();
    const isCurrentlyLiked = wishlist.includes(crewId);

    const mywish = {
      crewId: crewId,
      userId: userId,
    };

    setWishlist((prev) => {
      if (prev.includes(crewId)) {
        return prev.filter((id) => id !== crewId);
      } else {
        return [...prev, crewId];
      }
    });

    try {
      if (isCurrentlyLiked) {
        await removeWishlist(mywish);
      } else {
        await addWishlist(mywish);
      }
    } catch (error) {
      setWishlist((prev) => {
        if (isCurrentlyLiked) {
          return [...prev, crewId];
        } else {
          return prev.filter((id) => id !== crewId);
        }
      });
    }
  };

  useEffect(() => {
    const pages = crewListQuery?.data?.pages || [];
    const merged = pages.flatMap((p) => p?.data?.body?.contents || []);
    setCrewList(merged);
  }, [crewListQuery.data]);

  const loadMoreRef = useRef(null);
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          crewListQuery.hasNextPage &&
          !crewListQuery.isFetchingNextPage
        ) {
          crewListQuery.fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [
    crewListQuery.hasNextPage,
    crewListQuery.isFetchingNextPage,
    crewListQuery.fetchNextPage,
  ]);

  const handleGunguChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("gunguId", value);
      p.set("searchText", searchInput);
      return p;
    });
  };
  
  const handleSearchOnClick = () => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      p.set("searchText", searchInput);
      p.set("gunguId", selectedGunguId);
      return p;
    });
  };


  return (
    <MainContainer>
      <div css={s.layout}>
        <h2>지역별 크루</h2>
        <div css={s.headerBox}>
          <Select
            css={s.selectBox}
            value={selectedGunguId}
            onChange={handleGunguChange}
            displayEmpty
          >
            <MenuItem value="" css={s.menuItem}>전체</MenuItem>
            {gunguList.map((gungu) => (
              <MenuItem
                key={gungu.gunguId}
                value={gungu.gunguId}
                css={s.menuItem}
              >
                {gungu.gunguName}
              </MenuItem>
            ))}
          </Select>

          <div css={s.headerContainer}>
            <SearchBox value={searchInput} onChange={setSearchInput} onSearch={handleSearchOnClick}>
              <Button onClick={() => navigate("/crew/register")}>
                크루 등록
              </Button>
            </SearchBox>
          </div>
        </div>

        <div css={s.gridBox}>
          {crewList.length === 0 ? (
            <p>크루가 없습니다.</p>
          ) : (
            crewList.map((crew) => {
              const isLiked = wishlist.includes(crew.crewId);
              const isTopRanking = top5Member.includes(crew.crewId);
              const isNewRanking = top5CreatedAt.includes(crew.crewId);
              return (
                <div
                  key={crew.crewId}
                  css={s.cards}
                  onClick={() => navigate(`/crews/${crew.crewId}`)}
                >
                  <div css={s.tumbnailBox}>
                    <img src={crew?.profilePicture} alt="" />
                    <motion.div
                      css={s.heartIcon}
                      onClick={(e) => handleLike(e, crew.crewId)}
                      animate={{ scale: isLiked ? [1, 1.4, 1] : [1, 0.8, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {isLiked ? (
                        <PiHeartFill color="#fc2848" />
                      ) : (
                        <PiHeart color="#fafafa" />
                      )}
                    </motion.div>
                  </div>
                  <div css={s.textBox}>
                    <div css={s.gungu}>{crew.gunguName}</div>
                    <div>
                      <span css={s.crewName}>[{crew.crewName}]</span>
                      <span css={s.crewTitle}>{crew.title}</span>
                    </div>
                  </div>
                  <div css={s.rankingBox}>
                    {isTopRanking && <div css={s.topRanking}>Top 랭킹</div>}
                    {isNewRanking && <div css={s.newRanking}>신규크루</div>}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div ref={loadMoreRef} style={{ height: 1 }} />
      </div>
    </MainContainer>
  );
}

export default List;
