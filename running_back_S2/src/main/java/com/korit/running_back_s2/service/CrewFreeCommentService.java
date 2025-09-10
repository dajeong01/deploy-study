package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeComment;
import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeCommentMapper;
import com.korit.running_back_s2.dto.crewFree.FreeCommentReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CrewFreeCommentService {

    private final PrincipalUtil principalUtil;
    private final CrewFreeCommentMapper crewFreeCommentMapper;
    private final ImageUrlUtil imageUrlUtil;

    public void registerComment(FreeCommentReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        CrewFreeComment freeComment = CrewFreeComment.builder()
                .freeId(dto.getFreeId())
                .userId(userId)
                .content(dto.getContent())
                .build();
        crewFreeCommentMapper.insert(freeComment);
    }

    public List<CrewFreeComment> getFreeCommentList(Integer freeId) {
        List<CrewFreeComment> comments = crewFreeCommentMapper.getCommentList(freeId).stream().map(comment -> {
            comment.getUser().setPicture(imageUrlUtil.buildImageUrl(comment.getUser().getPicture(), "profile"));
            return comment;
        }).collect(Collectors.toList());
        return comments;
    }

    public void updateComment(Integer freeCommentId, String content) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int updated = crewFreeCommentMapper.updateComment(freeCommentId, userId, content);
    }

    @Transactional
    public void deleteComment(Integer freeId, Integer freeCommentId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int deleted = crewFreeCommentMapper.deleteComment(freeId, freeCommentId, userId);
    }
}
