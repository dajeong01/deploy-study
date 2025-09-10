package com.korit.running_back_s2.dto.report;

import com.korit.running_back_s2.domain.report.Report;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReportRespDto {
    private List<ReportResqDto> madeReports;
    private List<ReportResqDto> receivedReports;
}
