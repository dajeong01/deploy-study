package com.korit.running_back_s2.controller;


import com.korit.running_back_s2.dto.ask.AnswerReqDto;
import com.korit.running_back_s2.dto.ask.AskReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.AskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ask")
@RequiredArgsConstructor
public class AskController {
    
    private final AskService askService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> get(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(askService.getList(page, size, searchText)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> register(@RequestBody AskReqDto dto) throws Exception {
        askService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("문의 등록 성공"));
    }

    @GetMapping("/{askId}")
    public ResponseEntity<ResponseDto<?>> getDetail(@PathVariable Integer askId) {
        return ResponseEntity.ok(ResponseDto.success(askService.getDetail(askId)));
    }

    @PostMapping("/{askId}")
    public ResponseEntity<ResponseDto<?>> registerAnswer(@PathVariable Integer askId, @RequestBody AnswerReqDto dto) throws Exception {
        askService.registerAnswer(askId, dto);
        return ResponseEntity.ok(ResponseDto.success("답변 등록 성공"));
    }
}
