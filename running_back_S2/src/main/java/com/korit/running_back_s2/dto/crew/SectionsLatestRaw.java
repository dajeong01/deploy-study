package com.korit.running_back_s2.dto.crew;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
public class SectionsLatestRaw {
    private Timestamp members;
    private Timestamp gatherings;
    private Timestamp freeBoards;
    private Timestamp notices; // 복수형!
}