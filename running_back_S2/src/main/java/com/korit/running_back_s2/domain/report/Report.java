package com.korit.running_back_s2.domain.report;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private Integer reportId;
    private Integer crewId;
    private Integer reportMemberId;         // 신고 한
    private Integer reportedMemberId;       // 신고 당한
    private String reason;
    private LocalDateTime createdAt;

    private User reporterUser;
    private User reportedUser;
}

