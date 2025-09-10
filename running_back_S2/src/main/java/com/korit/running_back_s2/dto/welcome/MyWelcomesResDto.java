package com.korit.running_back_s2.dto.welcome;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MyWelcomesResDto {
    private Integer welcomeId;
    private Integer crewId;
    private String crewName;
    private String profilePicture;
    private Integer userId;
    private String content;
    private String status;
    private LocalDateTime createdAt;
}
