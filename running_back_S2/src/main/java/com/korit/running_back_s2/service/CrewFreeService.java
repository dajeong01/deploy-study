package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewFreeBoard.CrewFree;
import com.korit.running_back_s2.domain.crewFreeBoard.CrewFreeMapper;
import com.korit.running_back_s2.domain.crewFreeBoard.CrewFreeSearchOption;
import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeCommentMapper;
import com.korit.running_back_s2.dto.crewFree.FreeBoardReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewFreeService {

    private final CrewFreeMapper crewFreeMapper;
    private final PrincipalUtil principalUtil;
    private final CrewFreeCommentMapper crewFreeCommentMapper;

    public PaginationRespDto<CrewFree> getCrewFree(Integer page, Integer size, Integer crewId, String searchText) {
        CrewFreeSearchOption opt = CrewFreeSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<CrewFree> contents = crewFreeMapper.findAllFreeListBySearchOption(opt);
        Integer totalElements = crewFreeMapper.countFreeListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<CrewFree>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(Integer crewId, FreeBoardReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        CrewFree crewFree = CrewFree.builder()
                .crewId(crewId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        crewFreeMapper.insert(crewFree);
    }

    public List<CrewFree> getFreeBoardDetail(Integer crewId, Integer freeId) {
        return crewFreeMapper.findDetailById(crewId, freeId);
    }

    public void updateContent(Integer crewId, Integer freeId, FreeBoardReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        CrewFree newcrewFree = CrewFree.builder()
                .freeId(freeId)
                .crewId(crewId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        crewFreeMapper.updateContent(newcrewFree);
    }

    public void deleteFeed(Integer crewId, Integer freeId) {
        crewFreeMapper.deleteFeed(crewId, freeId);
    }
}

