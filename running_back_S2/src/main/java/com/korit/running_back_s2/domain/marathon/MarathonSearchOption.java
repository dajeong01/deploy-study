package com.korit.running_back_s2.domain.marathon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarathonSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
    private Integer month;
}

