package com.korit.running_back_s2.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSearchOption {
    private Integer startIndex;
    private Integer size;
    private String  searchText;
}
