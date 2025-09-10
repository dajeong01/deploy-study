package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.user.UserGatheringsReqDto;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
    List<Gathering> findAllByCrewId(@Param("crewId") Integer crewId);
    List<User> findParticipantsByGatheringId(int gatheringId);

    List<UserGatheringsReqDto> findGatheringByUserId(Integer userId);
    int update(Gathering gathering);

    Gathering findByGatheringId(Integer gatheringId);

    double getKmById(@Param("gatheringId") Integer gatheringId);
}
