package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewUpdateReqDto;
import com.korit.running_back_s2.dto.image.CrewAlbumImageDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewAlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.service.CrewService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;
    private final CrewAlbumService crewAlbumService;

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrewById (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrewById(crewId)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrew(@ModelAttribute CrewRegisterReqDto dto) throws Exception {
        crewService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew 등록 성공"));
    }

    @GetMapping(params = "crewName")
    public ResponseEntity<ResponseDto<?>> checkCrewName(@RequestParam String crewName) {
        return ResponseEntity.ok(ResponseDto.success(crewService.checkCrewNames(crewName)));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewList(
            @RequestParam Integer page, @RequestParam Integer size,
            @RequestParam(required = false) Integer gunguId,
            @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrewList(page, size, gunguId, searchText)));
    }

    @GetMapping("/{userId}/role")
    public ResponseEntity<ResponseDto<?>> getCrewRole (@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrewRole(userId)));
    }

    @PostMapping("/{crewId}/thumbnail")
    public ResponseEntity<ResponseDto<?>> updateCrewThumbnail(@RequestPart("thumbnailPicture") MultipartFile profileFile,
                                                            @PathVariable Integer crewId) {
        crewService.updateCrewThumbnailPicture(crewId, profileFile);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @PostMapping("/{crewId}/profile")
    public ResponseEntity<ResponseDto<?>> updateCrewProfile(@RequestPart("profilePicture") MultipartFile profileFile,
                                                              @PathVariable Integer crewId) {
        crewService.updateCrewProfilePicture(crewId, profileFile);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @PatchMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> updateCrewData(@RequestBody CrewUpdateReqDto dto) {
        crewService.updateCrew(dto);
        return ResponseEntity.ok(ResponseDto.success("크루 정보 수정 성공"));
    }


    @GetMapping("/{crewId}/albums")
    public ResponseEntity<ResponseDto<List<CrewAlbumImageDto>>> getCrewAlbumImages(
            @PathVariable int crewId
    ) {
        List<CrewAlbumImageDto> list = crewAlbumService.getCrewAlbumImages(crewId);
        return ResponseEntity.ok(ResponseDto.success(list));
    }

    @GetMapping("/{crewId}/meta/latest")
    public ResponseEntity<?> latest(@PathVariable Integer crewId) {
        CrewService.SectionsLatestDto body = crewService.getSectionsLatest(crewId);
        return ResponseEntity.ok(ResponseDto.success(body));
    }

}
