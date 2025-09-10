package com.korit.running_back_s2.domain.marathon;

import com.korit.running_back_s2.domain.myPost.UserPost;
import com.korit.running_back_s2.domain.myPost.UserPostSearchOption;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MarathonMapper {
    List<Marathon> findAllEventsBySearchOption(MarathonSearchOption option);
    Integer countEventsBySearchOption(MarathonSearchOption option);
}
