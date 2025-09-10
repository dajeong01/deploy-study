package com.korit.running_back_s2.dto.user;

import com.korit.running_back_s2.domain.user.UserSearchOption;
import lombok.Data;

@Data
public class UserSearchReqDto {

    private Integer page;
    private Integer size;
    private String searchText;

    public UserSearchOption toOption () {
        return UserSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText(searchText)
                .build();
    }
}
