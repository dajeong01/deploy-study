package com.korit.running_back_s2.dto.crew;

import lombok.Data;

@Data
public class CrewUpdateReqDto {
    private Integer crewId;
    private String crewName;
    private String title;
    private String content;
    private Integer limitedPeople;
}
