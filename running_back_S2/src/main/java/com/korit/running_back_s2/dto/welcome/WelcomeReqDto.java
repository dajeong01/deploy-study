package com.korit.running_back_s2.dto.welcome;

import com.korit.running_back_s2.domain.welcome.Welcome;
import lombok.Data;

@Data
public class WelcomeReqDto {
    private Integer userId;
    private String content;

    public Welcome welcome(Integer crewId) {
        return Welcome.builder()
                .crewId(crewId)
                .userId(userId)
                .content(content)
                .build();
    }
}
