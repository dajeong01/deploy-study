package com.korit.running_back_s2.dto.ranking;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CrewRankingRespDto {
    private Integer crewId;
    private String crewName;
    private Integer gunguId;
    private String gunguName;
    private String profilePicture;
    private String thumbnailPicture;
    private Double totalKm;
    private Integer memberCount;
    private LocalDateTime createdAt;
}
