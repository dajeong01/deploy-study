package com.korit.running_back_s2.controller;


import com.korit.running_back_s2.dto.globalFree.GlobalFreeBoardReqDto;
import com.korit.running_back_s2.dto.globalFree.GlobalFreeCommentReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GlobalFreeCommentService;
import com.korit.running_back_s2.service.GlobalFreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/free")
@RequiredArgsConstructor
public class GlobalFreeController {

    private final GlobalFreeService globalFreeService;
    private final GlobalFreeCommentService globalFreeCommentService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getGlobalFree(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(globalFreeService.getGlobalFree(page, size, searchText)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerFreeBoard(@RequestBody GlobalFreeBoardReqDto dto) throws Exception {
        globalFreeService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("자유게시판 등록 성공"));
    }

    @GetMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> getFreeBoardDetail(@PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(globalFreeService.getFreeBoardDetail(freeId)));
    }

    @PutMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> updateContent(@PathVariable Integer freeId,@RequestBody GlobalFreeBoardReqDto dto) {
        globalFreeService.updateContent(freeId, dto);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @DeleteMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> deleteFeed(@PathVariable Integer freeId) {
        globalFreeService.deleteFeed(freeId);
        return ResponseEntity.ok(ResponseDto.success("삭제 완료"));
    }

    @PostMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> registerFreeComment(@RequestBody GlobalFreeCommentReqDto dto) {
        globalFreeCommentService.registerComment(dto);
        return ResponseEntity.ok(ResponseDto.success("댓글 등록 성공"));
    }

    @GetMapping("/detail/{freeId}/comments")
    public ResponseEntity<ResponseDto<?>> getFreeCommentList(@PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(globalFreeCommentService.getFreeCommentList(freeId)));
    }

    @PutMapping("/detail/{freeId}/comments/{freeCommentId}")
    public ResponseEntity<ResponseDto<?>> updateComment(@PathVariable Integer freeCommentId, @RequestBody GlobalFreeCommentReqDto dto) {
        globalFreeCommentService.updateComment(freeCommentId, dto.getContent());
        return ResponseEntity.ok(ResponseDto.success("댓글 수정 완료"));
    }

    @DeleteMapping("/detail/{freeId}/comments/{freeCommentId}")
    public ResponseEntity<ResponseDto<?>> deleteComment(
            @PathVariable Integer freeId,
            @PathVariable Integer freeCommentId) {
        globalFreeCommentService.deleteComment(freeId, freeCommentId);
        return ResponseEntity.ok(ResponseDto.success("댓글 삭제 완료"));
    }
}


