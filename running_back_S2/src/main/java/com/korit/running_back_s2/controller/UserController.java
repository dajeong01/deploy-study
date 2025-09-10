package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserMyPageUpdateReqDto;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.dto.welcome.UpdateMyWelcomeReqDto;
import com.korit.running_back_s2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ResponseDto<?>> register(@RequestBody UserRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(userService.register(dto)));
    }

    @DeleteMapping("/{userId}/delete")
    public ResponseEntity<ResponseDto<?>> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(ResponseDto.success("회원 탈퇴가 완료 되었습니다."));
    }

    @GetMapping("/users/nickname/check")
    public ResponseEntity<ResponseDto<?>> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(ResponseDto.success(userService.checkNickname(nickname)));
    }

    @GetMapping("/{userId}/mypage/")
    public ResponseEntity<ResponseDto<?>> getUserWelcome(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(userService.getWelcomeByUserId(userId)));
    }

    @PostMapping("/{userId}/picture")
    public ResponseEntity<ResponseDto<?>> updateUserProfile(@RequestPart("profileFile") MultipartFile profileFile,
                                                            @PathVariable Integer userId) {
        userService.updateUserProfileImg(userId, profileFile);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @PatchMapping("/user/update")
    public ResponseEntity<ResponseDto<?>> updateUserInfo(@RequestBody UserMyPageUpdateReqDto dto) {
        userService.updateUserInfo(dto);
        return ResponseEntity.ok(ResponseDto.success("유저 정보 수정 완료"));
    }

    @PatchMapping("/mypage")
    public ResponseEntity<ResponseDto<?>> updateMyWelcome(@RequestBody UpdateMyWelcomeReqDto dto) {
        userService.updateMyWelcome(dto);
        return ResponseEntity.ok(ResponseDto.success("user 가입 인사 수정 완료"));
    }

    @DeleteMapping("/mypage/{welcomeId}")
    public ResponseEntity<ResponseDto<?>> deleteMyWelcome(@PathVariable Integer welcomeId) {
        userService.deleteMyWelcome(welcomeId);
        return ResponseEntity.ok(ResponseDto.success("삭제 완료"));
    }

    @GetMapping("/{userId}/crews")
    public ResponseEntity<ResponseDto<?>> getMyCrews(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(userService.getMyCrews(userId)));
    }

    @GetMapping("/users/{userId}/gatherings")
    public ResponseEntity<ResponseDto<?>> getMyGatherings (@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(userService.getMyGathering(userId)));
    }
}
