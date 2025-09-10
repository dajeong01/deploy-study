package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.myPost.UserPost;
import com.korit.running_back_s2.domain.myPost.UserPostMapper;
import com.korit.running_back_s2.domain.myPost.UserPostSearchOption;
import com.korit.running_back_s2.domain.report.ReportMapper;
import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.dto.user.UserSearchReqDto;
import com.korit.running_back_s2.dto.user.UserSearchRespDto;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ImageUrlUtil imageUrlUtil;
    private final UserMapper userMapper;
    private final ReportMapper reportMapper;
    private final UserPostMapper userPostMapper;

    public UserSearchRespDto searchUser(UserSearchReqDto dto) {
        Integer totalElements = userMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<User> foundUsers = userMapper.findAllOfOptions(dto.toOption()).stream().map(user -> {
            user.setPicture(imageUrlUtil.buildImageUrl(user.getPicture(), "profile"));
            return user;
        }).collect(Collectors.toList());
        
        boolean isLast = dto.getPage().equals(totalPages);

        return UserSearchRespDto.builder()
                .contents(foundUsers)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
    }

    public void deleteReport (Integer reportId) {
        reportMapper.delete(reportId);
    }

    public PaginationRespDto<UserPost> getUserPosts(Integer page, Integer size, String searchText, String src, Integer crewId, Integer userId) {
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
