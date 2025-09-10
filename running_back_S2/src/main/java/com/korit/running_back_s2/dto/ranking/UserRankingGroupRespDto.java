package com.korit.running_back_s2.dto.ranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRankingGroupRespDto {
    List<UserRankingRespDto> totalKmRanking;
    List<UserRankingRespDto> gatheringCount;

}
