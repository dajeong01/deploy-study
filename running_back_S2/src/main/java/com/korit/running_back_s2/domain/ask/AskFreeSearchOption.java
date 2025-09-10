package com.korit.running_back_s2.domain.ask;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AskFreeSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
}
