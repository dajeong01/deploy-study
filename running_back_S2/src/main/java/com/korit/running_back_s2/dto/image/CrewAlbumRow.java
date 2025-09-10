package com.korit.running_back_s2.dto.image;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CrewAlbumRow {
    private Integer freeId;
    private String content;
    private LocalDateTime createdAt;
}
