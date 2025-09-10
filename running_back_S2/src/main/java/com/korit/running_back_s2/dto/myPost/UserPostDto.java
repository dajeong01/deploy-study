package com.korit.running_back_s2.dto.myPost;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserPostDto {
    private String src;
    private Integer postId;
    private Integer crewId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Integer userId;
}
