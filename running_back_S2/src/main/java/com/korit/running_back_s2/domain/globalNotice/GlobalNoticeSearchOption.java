package com.korit.running_back_s2.domain.globalNotice;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GlobalNoticeSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
}
