package com.korit.running_back_s2.domain.welcome;

import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.dto.welcome.MyWelcomesResDto;
import com.korit.running_back_s2.dto.welcome.UpdateMyWelcomeReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeResDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WelcomeMapper {
    int insert(Welcome welcome);
    List<WelcomeResDto> findAllByCrewId(Integer crewId);
    Welcome findByUserId(Welcome welcome);
    int update(Member member);
    int statusReject(Integer welcomeId);
    int deleteRejectedAfter7Days();
    int deleteWithDrawAfter14Days();

    List<MyWelcomesResDto> findAllByUserId(Integer userId);
    int updateMyWelcome(UpdateMyWelcomeReqDto dto);
    int deleteMyWelcome(Integer welcomeId);
}
