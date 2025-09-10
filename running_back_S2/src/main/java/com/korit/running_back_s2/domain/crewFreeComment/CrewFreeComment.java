package com.korit.running_back_s2.domain.crewFreeComment;

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
public class CrewFreeComment {
    private Integer freeCommentId;
    private Integer freeId;
    private String content;
    private Integer userId;
    private LocalDateTime createdAt;

    private User user;
}

