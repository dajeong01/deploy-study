package com.korit.running_back_s2.dto.member;

import lombok.Data;

@Data
public class MemberRoleUpdateReqDto {
    private Integer memberId;
    private Integer crewId;
    private Integer roleId;
}
