package com.korit.running_back_s2.dto.crew;

import lombok.Data;

@Data
public class CrewsByUserIdResDto {
    private Integer crewId;
    private String crewName;
    private String title;
    private String thumbnailPicture;
    private String gunguName;
    private String roleName;
}
