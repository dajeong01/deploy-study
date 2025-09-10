package com.korit.running_back_s2.domain.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private Integer messageId;
    private Integer crewId;
    private String content;
    private LocalDateTime createdAt;
}
