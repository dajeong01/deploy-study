package com.korit.running_back_s2.domain.notice;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrewNoticeSearchOption {
    private Integer crewId;
    private Integer startIndex;
    private Integer size;
    private String searchText;
}
