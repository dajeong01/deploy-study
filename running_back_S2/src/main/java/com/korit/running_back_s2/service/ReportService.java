package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.report.Report;
import com.korit.running_back_s2.domain.report.ReportMapper;
import com.korit.running_back_s2.dto.report.ReportReqDto;
import com.korit.running_back_s2.dto.report.ReportResqDto;
import com.korit.running_back_s2.dto.report.UserReportRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final PrincipalUtil principalUtil;
    private final ReportMapper reportMapper;

    public void report(Integer crewId, ReportReqDto dto) {
        Integer reporterUserId = principalUtil.getPrincipalUser().getUser().getUserId();
        Integer reportedMemberId = dto.getMemberId();
        Integer reporterMemberId = reportMapper.findMemberIdByCrewAndUser(crewId, reporterUserId);
        reportMapper.insertReport(crewId, reporterMemberId, reportedMemberId, dto.getReason());
    }

    public List<Report> getReportsByCrew(Integer crewId) {
        return reportMapper.findReportsByCrew(crewId);
    }

    public UserReportRespDto getUserReported(Integer userId) {
        List<ReportResqDto> madeReports = reportMapper.findReportsMadeByUser(userId);
        List<ReportResqDto> receivedReports = reportMapper.findReportsReceivedByUser(userId);
        return new UserReportRespDto(madeReports, receivedReports);
    }
}

