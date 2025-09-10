package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.ask.Answer;
import com.korit.running_back_s2.domain.ask.Ask;
import com.korit.running_back_s2.domain.ask.AskFreeSearchOption;
import com.korit.running_back_s2.domain.ask.AskMapper;
import com.korit.running_back_s2.dto.ask.AnswerReqDto;
import com.korit.running_back_s2.dto.ask.AskReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AskService {

    private final AskMapper askMapper;
    private final PrincipalUtil principalUtil;

    public PaginationRespDto<Ask> getList(Integer page, Integer size, String searchText) {
        AskFreeSearchOption opt = AskFreeSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<Ask> contents = askMapper.findAllAskBySearchOption(opt);
        Integer totalElements = askMapper.countListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<Ask>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(AskReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Ask ask = Ask.builder()
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        askMapper.insert(ask);
    }

    public List<Ask> getDetail(Integer askId) {
        return askMapper.findDetailById(askId);
    }

    public void registerAnswer(Integer askId, AnswerReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Answer answer = Answer.builder()
                .askId(askId)
                .userId(userId)
                .content(dto.getContent())
                .build();

        askMapper.insertAnswer(answer);
        askMapper.updateIsAnswer(askId);
    }
}
