package com.korit.running_back_s2.dto.welcome;

import lombok.Data;

@Data
public class UpdateMyWelcomeReqDto {
    private Integer welcomeId;
    private Integer userId;
    private String content;
}
