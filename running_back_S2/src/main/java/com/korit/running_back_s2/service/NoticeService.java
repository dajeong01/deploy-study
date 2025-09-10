package com.korit.running_back_s2.service;


import com.korit.running_back_s2.domain.notice.CrewNotice;
import com.korit.running_back_s2.domain.notice.CrewNoticeMapper;
import com.korit.running_back_s2.domain.notice.CrewNoticeSearchOption;
import com.korit.running_back_s2.dto.notice.NoticeReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final PrincipalUtil principalUtil;
    private final CrewNoticeMapper crewNoticeMapper;

    public PaginationRespDto<CrewNotice> getCrewNotice(Integer page, Integer size, Integer crewId, String searchText) {
        CrewNoticeSearchOption opt = CrewNoticeSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<CrewNotice> contents = crewNoticeMapper.findAllNoticeListBySearchOption(opt);
        Integer totalElements = crewNoticeMapper.countNoticeListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<CrewNotice>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(Integer crewId, NoticeReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        CrewNotice crewNotice = CrewNotice.builder()
                .crewId(crewId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        crewNoticeMapper.insert(crewNotice);
    }

    public List<CrewNotice> getNoticeDetail(Integer crewId, Integer noticeId) {
        return crewNoticeMapper.findDetailById(crewId, noticeId);
    }

    public void updateContent(Integer crewId, Integer noticeId, NoticeReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        CrewNotice newcrewNotice = CrewNotice.builder()
                .noticeId(noticeId)
                .crewId(crewId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        crewNoticeMapper.updateContent(newcrewNotice);
    }

    public void deleteFeed(Integer crewId, Integer noticeId) {
        crewNoticeMapper.deleteFeed(crewId, noticeId);
    }
}

