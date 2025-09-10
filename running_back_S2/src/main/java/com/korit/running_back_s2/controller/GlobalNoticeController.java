package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.notice.NoticeReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GlobalNoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class GlobalNoticeController {
    
    private final GlobalNoticeService globalNoticeService;

    @GetMapping("/role")
    public ResponseEntity<ResponseDto<?>> checkRoleAdmin() {
        return ResponseEntity.ok(ResponseDto.success(globalNoticeService.checkRoleAdmin()));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerGlobalNotice(@RequestBody NoticeReqDto dto) {
        globalNoticeService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));
    }

    @GetMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> getNoticeBoardDetail(@PathVariable Integer noticeId) {
        return ResponseEntity.ok(ResponseDto.success(globalNoticeService.getNoticeDetail(noticeId)));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getGlobalNotice(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(globalNoticeService.getGlobalNotice(page, size, searchText)));
    }

    @PutMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> updateContent(@PathVariable Integer noticeId,@RequestBody NoticeReqDto dto) {
        globalNoticeService.updateContent(noticeId, dto);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @DeleteMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> deleteFeed(@PathVariable Integer noticeId) {
        globalNoticeService.deleteFeed(noticeId);
        return ResponseEntity.ok(ResponseDto.success("삭제 완료"));
    }
}
