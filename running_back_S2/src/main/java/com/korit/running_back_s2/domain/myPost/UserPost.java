package com.korit.running_back_s2.domain.myPost;

import com.korit.running_back_s2.domain.crew.Crew;
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
public class UserPost {
    private String src;
    private Integer postId;
    private Integer crewId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer userId;

    private User user;
    private Crew crew;
}
