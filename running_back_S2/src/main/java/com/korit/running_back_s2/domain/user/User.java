package com.korit.running_back_s2.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String oauthType;
    private String providerId;
    private String email;
    private String picture;
    private String fullName;
    private String nickname;
    private Integer gunguId;
    private String address;
    private String phoneNumber;
    private LocalDate birthDate;
    private Integer gender;
    private Double totalKm;
    private String role;

    private Integer attendanceStatus;
}
