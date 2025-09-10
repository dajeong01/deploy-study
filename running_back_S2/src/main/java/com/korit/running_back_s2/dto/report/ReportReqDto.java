package com.korit.running_back_s2.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportReqDto {
    private Integer memberId;
    private String reason;
}
