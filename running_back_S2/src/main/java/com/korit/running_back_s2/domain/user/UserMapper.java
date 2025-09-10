package com.korit.running_back_s2.domain.user;

import com.korit.running_back_s2.dto.ranking.UserRankingRespDto;
import com.korit.running_back_s2.dto.welcome.WelcomeByUserIdResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
    int updateProfileImgById(Integer userId, String picture);
    String findPictureById(Integer userId);
    List<WelcomeByUserIdResDto> findWelcomeByUserId(Integer userId);
    int updateUser(User user);
    int deleteUser(Integer userId);
    int insertDeleteTb(DeletedUser deletedUser);

    List<UserRankingRespDto> selectUserRankingByTotalKm();
    List<UserRankingRespDto> selectUserRankingByGatheringCount();


    List<User> findAllOfOptions(UserSearchOption option);
    Integer getCountOfOptions(UserSearchOption option);

    void updateUserKm(@Param("userId") Integer userId,
                      @Param("kmToAdd") double kmToAdd);
}
