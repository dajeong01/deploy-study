package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.marathon.Marathon;
import com.korit.running_back_s2.domain.marathon.MarathonMapper;
import com.korit.running_back_s2.domain.marathon.MarathonSearchOption;
import com.korit.running_back_s2.domain.myPost.UserPost;
import com.korit.running_back_s2.domain.myPost.UserPostSearchOption;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarathonService {

    private final MarathonMapper marathonMapper;

    public PaginationRespDto<Marathon> getEvents(Integer page, Integer size, String searchText, Integer month) {
        MarathonSearchOption opt = MarathonSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .month(month)
                .build();

        List<Marathon> contents = marathonMapper.findAllEventsBySearchOption(opt);
        Integer totalElements = marathonMapper.countEventsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<Marathon>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }
}
