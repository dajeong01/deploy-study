package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.globalFreeComment.GlobalFreeComment;
import com.korit.running_back_s2.domain.globalFreeComment.GlobalFreeCommentMapper;
import com.korit.running_back_s2.dto.globalFree.GlobalFreeCommentReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class GlobalFreeCommentService {
    private final PrincipalUtil principalUtil;
    private final GlobalFreeCommentMapper globalFreeCommentMapper;
    private final ImageUrlUtil imageUrlUtil;

    public void registerComment(GlobalFreeCommentReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        GlobalFreeComment freeComment = GlobalFreeComment.builder()
                .freeId(dto.getFreeId())
                .userId(userId)
                .content(dto.getContent())
                .build();
        globalFreeCommentMapper.insert(freeComment);
    }

    public List<GlobalFreeComment> getFreeCommentList(Integer freeId) {
        List<GlobalFreeComment> comments = globalFreeCommentMapper.getCommentList(freeId).stream().map(comment -> {
            comment.getUser().setPicture(imageUrlUtil.buildImageUrl(comment.getUser().getPicture(), "profile"));
            return comment;
        }).collect(Collectors.toList());
        return comments;
    }

    public void updateComment(Integer freeCommentId, String content) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int updated = globalFreeCommentMapper.updateComment(freeCommentId, userId, content);
    }

    @Transactional
    public void deleteComment(Integer freeId, Integer freeCommentId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int deleted = globalFreeCommentMapper.deleteComment(freeId, freeCommentId, userId);
    }
}

