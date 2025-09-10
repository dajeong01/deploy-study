package com.korit.running_back_s2.domain.ask;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ask {
    private Integer askId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer isAnswer;

    private User user;
    private Answer answer;
}
