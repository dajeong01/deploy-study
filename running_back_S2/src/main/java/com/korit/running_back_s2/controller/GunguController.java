package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GunguService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gungus")
@RequiredArgsConstructor
public class GunguController {
    private final GunguService gunguService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getGunguList() {
        return ResponseEntity.ok(ResponseDto.success(gunguService.getAllGungu()));
    }
}