package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.dto.participant.ParticipantAttendanceUpdateDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ParticipantMapper {

    int insert(@Param("gatheringId") Integer gatheringId, @Param("userId") Integer userId);

    int deleteByGatheringIdAndUserId(@Param("gatheringId") Integer gatheringId, @Param("userId") Integer userId);

    int countByGatheringId(@Param("gatheringId") Integer gatheringId);

    boolean existsByGatheringIdAndUserId(Integer gatheringId, Integer userId);

    Integer getAttendanceStatusById(@Param("gatheringId") Integer gatheringId,
                                    @Param("userId") Integer userId);

    int updateAttendance(@Param("gatheringId") Integer gatheringId,
                         @Param("list") List<ParticipantAttendanceUpdateDto> list);
}
