package com.korit.running_back_s2.domain.globalFreeComment;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GlobalFreeCommentMapper {
    void insert(GlobalFreeComment freeComment);
    List<GlobalFreeComment> getCommentList(Integer freeId);

    int updateComment(@Param("freeCommentId") Integer freeCommentId,
                      @Param("userId") Integer userId,
                      @Param("content") String content);

    int deleteComment(@Param("freeId") Integer freeId,
                            @Param("freeCommentId") Integer freeCommentId,
                            @Param("userId") Integer userId);
}
