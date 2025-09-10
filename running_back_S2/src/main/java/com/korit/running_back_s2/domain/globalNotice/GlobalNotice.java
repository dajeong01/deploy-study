package com.korit.running_back_s2.domain.globalNotice;

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
public class GlobalNotice {
    private Integer noticeId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime createdAt;

    private User user;
}
