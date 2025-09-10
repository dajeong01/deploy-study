package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.notice.NoticeReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notices/{crewId}")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrewNotice(@PathVariable Integer crewId, @RequestBody NoticeReqDto dto) {
        noticeService.register(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));
    }

    @GetMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> getNoticeBoardDetail(@PathVariable Integer crewId, @PathVariable Integer noticeId) {
        return ResponseEntity.ok(ResponseDto.success(noticeService.getNoticeDetail(crewId, noticeId)));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewNotice(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer crewId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(noticeService.getCrewNotice(page, size, crewId, searchText)));
    }

    @PutMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> updateContent(@PathVariable Integer crewId,@PathVariable Integer noticeId,@RequestBody NoticeReqDto dto) {
        noticeService.updateContent(crewId, noticeId, dto);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @DeleteMapping("/detail/{noticeId}")
    public ResponseEntity<ResponseDto<?>> deleteFeed(@PathVariable Integer crewId,@PathVariable Integer noticeId) {
        noticeService.deleteFeed(crewId, noticeId);
        return ResponseEntity.ok(ResponseDto.success("삭제 완료"));
    }

}
