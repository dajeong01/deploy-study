package com.korit.running_back_s2.dto.ask;

import com.korit.running_back_s2.domain.user.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AnswerReqDto {

    private Integer askId;
    private String content;
    private LocalDate createdAt;

    private User user;
}
