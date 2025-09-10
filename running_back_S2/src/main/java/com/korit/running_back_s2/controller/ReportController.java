package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.report.ReportReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/crews/{crewId}")
    public ResponseEntity<?> report(@PathVariable Integer crewId, @RequestBody ReportReqDto dto) {
        reportService.report(crewId, dto);
//        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success("신고가 접수되었습니다."));
    }
    @GetMapping("/crews/{crewId}")
    public ResponseEntity<?> getReports(@PathVariable Integer crewId) {
//        System.out.println(crewId);
        return ResponseEntity.ok(ResponseDto.success(reportService.getReportsByCrew(crewId)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto<?>> getMyReported(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(reportService.getUserReported(userId)));
    }


}
