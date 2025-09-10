package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFree;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeMapper;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeSearchOption;
import com.korit.running_back_s2.dto.globalFree.GlobalFreeBoardReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalFreeService {
    private final GlobalFreeMapper globalFreeMapper;
    private final PrincipalUtil principalUtil;

    public PaginationRespDto<GlobalFree> getGlobalFree(Integer page, Integer size, String searchText) {
        GlobalFreeSearchOption opt = GlobalFreeSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<GlobalFree> contents = globalFreeMapper.findAllFreeListBySearchOption(opt);
        Integer totalElements = globalFreeMapper.countFreeListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<GlobalFree>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(GlobalFreeBoardReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        GlobalFree globalFree = GlobalFree.builder()
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        globalFreeMapper.insert(globalFree);
    }

    public List<GlobalFree> getFreeBoardDetail(Integer freeId) {
        return globalFreeMapper.findDetailById(freeId);
    }

    public void updateContent(Integer freeId, GlobalFreeBoardReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        GlobalFree newglobalFree = GlobalFree.builder()
                .freeId(freeId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        globalFreeMapper.updateContent(newglobalFree);
    }

    public void deleteFeed(Integer freeId) {
        globalFreeMapper.deleteFeed(freeId);
    }
}

