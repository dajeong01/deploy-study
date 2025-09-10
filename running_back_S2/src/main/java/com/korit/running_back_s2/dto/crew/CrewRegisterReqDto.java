package com.korit.running_back_s2.dto.crew;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CrewRegisterReqDto {
    private Integer gunguId;
    private String crewName;
    private String title;
    private String content;
    private Integer limitedPeople;
    private MultipartFile profilePicture;
    private MultipartFile thumbnailPicture;
    private Integer userId;
}