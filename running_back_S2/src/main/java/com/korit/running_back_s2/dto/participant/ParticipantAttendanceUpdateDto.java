package com.korit.running_back_s2.dto.participant;

import lombok.Data;

@Data
public class ParticipantAttendanceUpdateDto {
    private Integer userId;
    private Integer attendanceStatus;

}