package com.korit.running_back_s2.domain.gathering;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Participant {
    private Integer participantId;
    private Integer gatheringId;
    private Integer userId;
    private LocalDateTime createdAt;
    private Integer attendanceStatus;
}