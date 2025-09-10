package com.korit.running_back_s2.domain.crewFreeComment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewFreeCommentMapper {
    void insert(CrewFreeComment freeComment);
    List<CrewFreeComment> getCommentList(Integer freeId);

    int updateComment(@Param("freeCommentId") Integer freeCommentId,
                      @Param("userId") Integer userId,
                      @Param("content") String content);

    int deleteComment(@Param("freeId") Integer freeId,
                            @Param("freeCommentId") Integer freeCommentId,
                            @Param("userId") Integer userId);
}
