package com.korit.running_back_s2.dto.ranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CrewRankingGroupRespDto {
    private List<CrewRankingRespDto> totalKmRanking;
    private List<CrewRankingRespDto> memberRanking;
    private List<CrewRankingRespDto> newRanking;

}
