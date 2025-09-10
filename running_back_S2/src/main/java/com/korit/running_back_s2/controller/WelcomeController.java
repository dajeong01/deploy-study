package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.welcome.WelcomeReqDto;
import com.korit.running_back_s2.service.WelcomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/welcomes")
@RequiredArgsConstructor
public class WelcomeController {

    private final WelcomeService welcomeService;

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrewWelcomes(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(welcomeService.getWelcomes(crewId)));
    }

    @PostMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> registerCrewWelcome(@PathVariable Integer crewId, @RequestBody WelcomeReqDto dto) {
        welcomeService.registerWelcome(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));
    }

    @PatchMapping("/{welcomeId}")
    public ResponseEntity<ResponseDto<?>> reJectWelcome(@PathVariable Integer welcomeId) {
        welcomeService.reject(welcomeId);
        return ResponseEntity.ok(ResponseDto.success("승인 거절 성공"));
    }

    @GetMapping("/mypage/{userId}")
    public ResponseEntity<ResponseDto<?>> getMyWelcomes(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(welcomeService.getMyWelcomes(userId)));
    }
}
