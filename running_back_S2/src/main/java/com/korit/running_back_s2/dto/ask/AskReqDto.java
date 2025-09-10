package com.korit.running_back_s2.dto.ask;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AskReqDto {
    private String title;
    private String content;
}
