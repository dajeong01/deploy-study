package com.korit.running_back_s2.dto.crew;

import lombok.Data;

@Data
public class CrewRoleReqDto {
    private Integer crewId;
    private Integer userId;
    private Integer roleId;
}
