package com.korit.running_back_s2.domain.ask;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Answer {

    private Integer answerId;
    private Integer userId;
    private Integer askId;
    private String content;
    private LocalDateTime createdAt;

    private User user;
}
