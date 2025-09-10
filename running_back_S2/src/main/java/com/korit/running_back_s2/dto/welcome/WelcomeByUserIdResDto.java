package com.korit.running_back_s2.dto.welcome;

import lombok.Data;

@Data
public class WelcomeByUserIdResDto {
    private Integer crewId;
    private String crewName;
    private String profilePicture;
    private String status;
}
