package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.message.MessageReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/crews/{crewId}/messages")
    public ResponseEntity<ResponseDto<?>> getCrewMessage (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(messageService.getCrewMessage(crewId)));
    }

    @PostMapping("/admin/{crewId}/messages")
    public ResponseEntity<ResponseDto<?>> registerCrewMessage (@PathVariable Integer crewId, @RequestBody MessageReqDto dto) {
        messageService.registerCrewMessage(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("메세지 전송 성공"));
    }


}
