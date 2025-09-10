package com.korit.running_back_s2.domain.welcome;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Welcome {
    private Integer welcomeId;
    private Integer crewId;
    private Integer userId;
    private String content;
}
