package com.korit.running_back_s2.dto.welcome;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class WelcomeResDto {
    private Integer welcomeId;
    private Integer crewId;
    private Integer userId;
    private String content;
    private String status;
    private LocalDateTime createdAt;
    private LocalDate birthDate;
    private String nickname;
    private String fullName;
    private Integer welcomeRank;
}
