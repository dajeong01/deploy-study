package com.korit.running_back_s2.dto.ranking;

import lombok.Data;

@Data
public class UserRankingRespDto {
    private Integer userId;
    private String picture;
    private String fullName;
    private String nickname;
    private Integer gender;
    private Double totalKm;

    private Integer gatheringCount;
}
