package com.korit.running_back_s2.service;


import com.korit.running_back_s2.domain.globalNotice.GlobalNotice;
import com.korit.running_back_s2.domain.globalNotice.GlobalNoticeMapper;
import com.korit.running_back_s2.domain.globalNotice.GlobalNoticeSearchOption;
import com.korit.running_back_s2.dto.notice.NoticeReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class GlobalNoticeService {
    private final PrincipalUtil principalUtil;
    private final GlobalNoticeMapper globalNoticeMapper;

    public PaginationRespDto<GlobalNotice> getGlobalNotice(Integer page, Integer size, String searchText) {
        GlobalNoticeSearchOption opt = GlobalNoticeSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<GlobalNotice> contents = globalNoticeMapper.findAllNoticeListBySearchOption(opt);
        Integer totalElements = globalNoticeMapper.countNoticeListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<GlobalNotice>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(NoticeReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        GlobalNotice globalNotice = GlobalNotice.builder()
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        globalNoticeMapper.insert(globalNotice);
    }

    public List<GlobalNotice> getNoticeDetail(Integer noticeId) {
        return globalNoticeMapper.findDetailById(noticeId);
    }

    public void updateContent(Integer noticeId, NoticeReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        GlobalNotice newglobalNotice = GlobalNotice.builder()
                .noticeId(noticeId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        globalNoticeMapper.updateContent(newglobalNotice);
    }

    public void deleteFeed(Integer noticeId) {
        globalNoticeMapper.deleteFeed(noticeId);
    }

    public String checkRoleAdmin() {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return globalNoticeMapper.checkRoleAdmin(userId);
    }
}
