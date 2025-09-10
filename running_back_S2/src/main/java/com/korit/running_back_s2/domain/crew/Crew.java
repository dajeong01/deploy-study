package com.korit.running_back_s2.domain.crew;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Crew {
    private Integer crewId;
    private Integer gunguId;
    private String crewName;
    private String title;
    private String content;
    private String profilePicture;
    private String thumbnailPicture;
    private Integer limitedPeople;
    private Integer userId;
    private double totalKm;
    private LocalDateTime createdAt;

    private String gunguName;
    private String fullName;
}