package com.korit.running_back_s2.domain.crewFreeBoard;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewFree {
    private Integer freeId;
    private Integer crewId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    private User user;
}
