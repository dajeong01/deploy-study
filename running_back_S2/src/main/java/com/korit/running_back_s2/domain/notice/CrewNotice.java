package com.korit.running_back_s2.domain.notice;

import com.korit.running_back_s2.domain.member.Member;
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
public class CrewNotice {
    private Integer noticeId;
    private Integer crewId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    private User user;
    private Member member;
}
