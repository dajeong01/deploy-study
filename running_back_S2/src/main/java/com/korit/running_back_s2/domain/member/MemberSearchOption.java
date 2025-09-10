package com.korit.running_back_s2.domain.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberSearchOption {
    private Integer crewId;
    private Integer startIndex;
    private Integer size;
    private String searchText;
}

