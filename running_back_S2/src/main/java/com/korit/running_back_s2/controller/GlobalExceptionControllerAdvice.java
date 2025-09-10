package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.exception.auth.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionControllerAdvice {

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ResponseDto<String>> handleUnauthorized(UnauthorizedException e) {
        return ResponseEntity.badRequest().body(ResponseDto.fail(HttpStatus.UNAUTHORIZED, "로그인이 되지 않았습니다.", e.getMessage()));
    }
}
