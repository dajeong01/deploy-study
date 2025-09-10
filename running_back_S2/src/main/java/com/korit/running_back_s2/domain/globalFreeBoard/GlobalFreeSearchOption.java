package com.korit.running_back_s2.domain.globalFreeBoard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GlobalFreeSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
}
