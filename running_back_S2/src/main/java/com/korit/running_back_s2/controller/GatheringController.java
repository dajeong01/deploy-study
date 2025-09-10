package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.gathering.GatheringUpdateReqDto;
import com.korit.running_back_s2.dto.participant.ParticipantAttendanceUpdateDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GatheringService;
import com.korit.running_back_s2.service.ParticipantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class GatheringController {

    private final GatheringService gatheringService;
    private final ParticipantService participantService;

    @GetMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> getGatherings (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(gatheringService.getGatherings(crewId)));
    }

    @PostMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute GatheringRegisterReqDto dto) {
        System.out.println(dto);
        gatheringService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew gathering registered"));
    }

    @GetMapping("{crewId}/gatherings/{gatheringId}")
    public ResponseEntity<ResponseDto<?>> getGatheringDetail(@PathVariable Integer crewId, @PathVariable Integer gatheringId) {
        return ResponseEntity.ok(ResponseDto.success(gatheringService.getGatheringDetail(gatheringId)));
    }

    @PutMapping("{crewId}/gatherings/{gatheringId}")
    public ResponseEntity<ResponseDto<?>> updateGathering (@PathVariable Integer crewId, @PathVariable Integer gatheringId, @ModelAttribute GatheringUpdateReqDto dto) {
        gatheringService.updateGathering(gatheringId, dto);
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success("수정완료"));
    }

    @PostMapping("/{crewId}/gatherings/{gatheringId}/attend")
    public ResponseEntity<ResponseDto<?>> attendGathering(@PathVariable Integer crewId,
                                                                @PathVariable Integer gatheringId) {
        participantService.attendGathering(gatheringId);
        return ResponseEntity.ok(ResponseDto.success("참가완료"));
    }

    @DeleteMapping("/{crewId}/gatherings/{gatheringId}/attend")
    public ResponseEntity<ResponseDto<?>> cancelAttendance(@PathVariable Integer crewId, @PathVariable Integer gatheringId) {
        participantService.cancelAttendance(gatheringId);
        return ResponseEntity.ok(ResponseDto.success("불참완료"));
    }

    @GetMapping("/{crewId}/gatherings/{gatheringId}/participants")
    public ResponseEntity<List<User>> getParticipants(@PathVariable Integer crewId, @PathVariable int gatheringId) {
        return ResponseEntity.ok(gatheringService.getGatheringParticipants(gatheringId));
    }

    @PostMapping("/{crewId}/gatherings/{gatheringId}/participants/attendance")
    public ResponseEntity<ResponseDto<?>> updateParticipantsAttendance(
            @PathVariable Integer crewId,
            @PathVariable Integer gatheringId,
            @RequestBody List<ParticipantAttendanceUpdateDto> updates) {

        participantService.updateParticipantsAttendance(gatheringId, updates);
        System.out.println(updates);

        return ResponseEntity.ok(ResponseDto.success("출석 상태 저장 완료"));
    }
}

