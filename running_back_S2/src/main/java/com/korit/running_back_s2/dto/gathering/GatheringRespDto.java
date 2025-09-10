package com.korit.running_back_s2.dto.gathering;

import com.korit.running_back_s2.domain.user.User;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class GatheringRespDto {
    private Integer crewId;
    private String title;
    private String content;
    private String thumbnailPicture;
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
    private Integer status;

    private User user;

}
