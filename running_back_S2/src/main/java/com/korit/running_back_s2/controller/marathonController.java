package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.MarathonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/marathons")
@RequiredArgsConstructor
public class marathonController {

    private final MarathonService marathonService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getEvents(@RequestParam Integer page,
                                                     @RequestParam Integer size,
                                                     @RequestParam(required = false) String searchText,
                                                     @RequestParam(required = false) Integer month) {
        return ResponseEntity.ok(ResponseDto.success(marathonService.getEvents(page, size, searchText, month)));
    }
}
