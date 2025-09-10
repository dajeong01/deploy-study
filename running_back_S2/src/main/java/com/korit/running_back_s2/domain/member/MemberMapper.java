package com.korit.running_back_s2.domain.member;

import com.korit.running_back_s2.dto.crew.CrewsByUserIdResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    int insert(Member member);
    List<Member> findAllMembersBySearchOption(MemberSearchOption opt);
    Integer countMembersBySearchOption(MemberSearchOption opt);
    Member findById(Integer memberId);
    int updateRole(@Param("memberId") Integer memberId, @Param("roleId") Integer roleId);
    int deleteWelcomeByMemberId(@Param("memberId") Integer memberId);
    int deleteMember(@Param("memberId") Integer memberId);

    void insertLeaderRole(Integer userId, Integer crewId);
    int countMember(Integer crewId);

    Integer findMemberIdByCrewIdAndUserId(@Param("crewId") Integer crewId, @Param("userId") Integer userId);

    List<CrewsByUserIdResDto> findCrewsByUserId(Integer userId);

    List<Member> getMembers(Integer crewId);
}
