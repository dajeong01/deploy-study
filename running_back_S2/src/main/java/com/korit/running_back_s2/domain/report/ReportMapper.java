package com.korit.running_back_s2.domain.report;

import com.korit.running_back_s2.dto.report.ReportResqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReportMapper {
    Integer findMemberIdByCrewAndUser(@Param("crewId") int crewId,
                                      @Param("userId") int userId);

    int insertReport(@Param("crewId") int crewId,
                     @Param("reporterMemberId") int reporterMemberId,
                     @Param("reportedMemberId") int reportedMemberId,
                     @Param("reason") String reason);

    List<Report> findReportsByCrew(@Param("crewId") Integer crewId);
    int delete(Integer reportId);

    List<ReportResqDto> findReportsMadeByUser(Integer userId);
    List<ReportResqDto> findReportsReceivedByUser(Integer userId);
}

