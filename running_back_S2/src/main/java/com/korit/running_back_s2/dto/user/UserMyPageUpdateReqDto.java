package com.korit.running_back_s2.dto.user;

import com.korit.running_back_s2.domain.user.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserMyPageUpdateReqDto {
    private Integer userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String nickname;
    private LocalDate birthDate;
    private Integer gender;
    private String picture;
    private Integer gunguId;


    public User Entity() {
        return User.builder()
                .userId(userId)
                .email(email)
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .nickname(nickname)
                .birthDate(birthDate)
                .gender(gender)
                .picture(picture)
                .gunguId(gunguId)
                .build();
    }
}
