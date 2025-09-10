package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.ImageUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageUploadService imageUploadService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> upload(@RequestParam String imageConfigName, @RequestPart MultipartFile file) {
        return ResponseEntity.ok(ResponseDto.success(imageUploadService.upload(imageConfigName, file)));
    }

}