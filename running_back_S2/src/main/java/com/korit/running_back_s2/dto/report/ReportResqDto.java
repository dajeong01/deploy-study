package com.korit.running_back_s2.dto.report;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportResqDto {
    private Integer reportId;
    private Integer crewId;
    private Integer reportMemberId;
    private String reportMemberName;
    private Integer reportedMemberId;
    private String reportedMemberName;
    private String reason;
    private LocalDateTime createdAt;
}
