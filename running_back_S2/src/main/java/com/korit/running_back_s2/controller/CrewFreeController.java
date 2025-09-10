package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crewFree.FreeBoardReqDto;
import com.korit.running_back_s2.dto.crewFree.FreeCommentReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewFreeCommentService;
import com.korit.running_back_s2.service.CrewFreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freeBoards/{crewId}")
@RequiredArgsConstructor
public class CrewFreeController {

    private final CrewFreeService crewFreeService;
    private final CrewFreeCommentService crewFreeCommentService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewFree(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer crewId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeService.getCrewFree(page, size, crewId, searchText)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerFreeBoard(@PathVariable Integer crewId, @RequestBody FreeBoardReqDto dto) throws Exception {
        crewFreeService.register(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("크루 자유게시판 등록 성공"));
    }

    @GetMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> getFreeBoardDetail(@PathVariable Integer crewId, @PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeService.getFreeBoardDetail(crewId, freeId)));
    }

    @PutMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> updateContent(@PathVariable Integer crewId,@PathVariable Integer freeId,@RequestBody FreeBoardReqDto dto) {
        crewFreeService.updateContent(crewId, freeId, dto);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @DeleteMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> deleteFeed(@PathVariable Integer crewId,@PathVariable Integer freeId) {
        crewFreeService.deleteFeed(crewId, freeId);
        return ResponseEntity.ok(ResponseDto.success("삭제 완료"));
    }

    @PostMapping("/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> registerFreeComment(@RequestBody FreeCommentReqDto dto) {
        crewFreeCommentService.registerComment(dto);
        return ResponseEntity.ok(ResponseDto.success("댓글 등록 성공"));
    }

    @GetMapping("/detail/{freeId}/comments")
    public ResponseEntity<ResponseDto<?>> getFreeCommentList(@PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeCommentService.getFreeCommentList(freeId)));
    }

    @PutMapping("/detail/{freeId}/comments/{freeCommentId}")
    public ResponseEntity<ResponseDto<?>> updateComment(@PathVariable Integer freeCommentId, @RequestBody FreeCommentReqDto dto) {
        crewFreeCommentService.updateComment(freeCommentId, dto.getContent());
        return ResponseEntity.ok(ResponseDto.success("댓글 수정 완료"));
    }

    @DeleteMapping("/detail/{freeId}/comments/{freeCommentId}")
    public ResponseEntity<ResponseDto<?>> deleteComment(
            @PathVariable Integer freeId,
            @PathVariable Integer freeCommentId) {
        crewFreeCommentService.deleteComment(freeId, freeCommentId);
        return ResponseEntity.ok(ResponseDto.success("댓글 삭제 완료"));
    }
}
