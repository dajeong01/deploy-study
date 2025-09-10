package com.korit.running_back_s2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaginationRespDto<T> {
    private List<T> contents;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}