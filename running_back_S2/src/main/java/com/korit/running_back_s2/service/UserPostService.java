package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.myPost.UserPost;
import com.korit.running_back_s2.domain.myPost.UserPostMapper;
import com.korit.running_back_s2.domain.myPost.UserPostSearchOption;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPostService {

    private final PrincipalUtil principalUtil;
    private final UserPostMapper userPostMapper;

    public PaginationRespDto<UserPost> getMyPosts(Integer page, Integer size, String searchText, String src, Integer crewId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        UserPostSearchOption opt = UserPostSearchOption.builder()
                .userId(userId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .src((src != null && !src.isBlank()) ? src : null)
                .crewId(crewId)
                .build();

        List<UserPost> contents = userPostMapper.findAllUserPostsBySearchOption(opt);
        Integer totalElements = userPostMapper.countUserPostsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<UserPost>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }


}