package com.korit.running_back_s2.dto.gathering;

import com.korit.running_back_s2.domain.gathering.Gathering;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class GatheringRegisterReqDto {
    private Integer crewId;
    private String title;
    private String content;
    private MultipartFile thumbnailPicture;
    private String runningDate;
    private String runningTime;
    private String placeName;
    private String address;
    private String roadAddress;
    private String latitude;
    private String longitude;
    private Integer km;
    private Integer cost;
    private Integer maxParticipants;

    public Gathering toEntity() {
        return Gathering.builder()
                .crewId(crewId)
                .title(title)
                .content(content)
                .runningDate(runningDate)
                .runningTime(runningTime)
                .placeName(placeName)
                .address(address)
                .roadAddress(roadAddress)
                .latitude(latitude)
                .longitude(longitude)
                .km(km)
                .cost(cost)
                .maxParticipants(maxParticipants)
                .build();
    }
}
