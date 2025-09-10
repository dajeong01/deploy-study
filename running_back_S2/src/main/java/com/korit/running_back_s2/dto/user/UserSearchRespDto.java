package com.korit.running_back_s2.dto.user;

import com.korit.running_back_s2.domain.user.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserSearchRespDto {
    private List<User> contents;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}
