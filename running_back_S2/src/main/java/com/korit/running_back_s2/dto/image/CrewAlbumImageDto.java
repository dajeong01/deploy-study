package com.korit.running_back_s2.dto.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrewAlbumImageDto {
    private Integer freeId;
    private String imageUrl;
    private LocalDateTime createdAt;
}

