package com.korit.running_back_s2.domain.myPost;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserPostMapper {
    List<UserPost> findAllUserPostsBySearchOption(UserPostSearchOption option);
    Integer countUserPostsBySearchOption(UserPostSearchOption option);
}