package com.korit.running_back_s2.domain.member;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private Integer memberId;
    private Integer crewId;
    private Integer userId;
    private Integer roleId;

    private User user;
}