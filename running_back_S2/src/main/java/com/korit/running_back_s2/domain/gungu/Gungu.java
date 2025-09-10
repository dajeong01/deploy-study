package com.korit.running_back_s2.domain.gungu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gungu {

    private Integer gunguId;
    private String gunguName;
}
