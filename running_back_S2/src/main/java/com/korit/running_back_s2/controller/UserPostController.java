package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.UserPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class UserPostController {

    private final UserPostService userPostService;

    @GetMapping("/posts")
    public ResponseEntity<ResponseDto<?>> getMyPosts(@RequestParam Integer page,
                                                     @RequestParam Integer size,
                                                     @RequestParam(required = false) String searchText,
                                                     @RequestParam(required = false) String src,
                                                     @RequestParam(required = false) Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(userPostService.getMyPosts(page, size, searchText, src, crewId)));
    }
}