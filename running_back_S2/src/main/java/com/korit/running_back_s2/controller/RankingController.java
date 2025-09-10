package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ranking")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/crews")
    public ResponseEntity<ResponseDto<?>> getCrewRankings () {
        return ResponseEntity.ok(ResponseDto.success(rankingService.getAllCrewRankings()));
    }

    @GetMapping("/users")
    public ResponseEntity<ResponseDto<?>> getUserRanking () {
        return ResponseEntity.ok(ResponseDto.success(rankingService.getAllUserRankings()));
    }
}
