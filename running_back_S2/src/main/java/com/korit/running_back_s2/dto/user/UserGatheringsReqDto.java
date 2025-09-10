package com.korit.running_back_s2.dto.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserGatheringsReqDto {
    private Integer crewId;
    private String thumbnailPicture;
    private String crewName;
    private String title;
    private String runningDate;
    private String runningTime;
    private String placeName;
    private Integer km;
    private Integer cost;

}
