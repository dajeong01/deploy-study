package com.korit.running_back_s2.dto.user;

import com.korit.running_back_s2.domain.user.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterReqDto {
    private String oauthType;
    private String providerId;
    private String email;
    private String picture;
    private String fullName;
    private String nickname;
    private String phoneNumber;
    private LocalDate birthDate;
    private Integer gender;
    private String address;
    private Integer gunguId;
    private Double totalKm;

    public User toEntity() {
        return User.builder()
                .email(email)
                .oauthType(oauthType)
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .nickname(nickname)
                .birthDate(birthDate)
                .gender(gender)
                .address(address)
                .picture(picture)
                .providerId(providerId)
                .totalKm(0.0)
                .build();
    }
}