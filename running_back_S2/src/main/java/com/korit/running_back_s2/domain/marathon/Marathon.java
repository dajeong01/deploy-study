package com.korit.running_back_s2.domain.marathon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Marathon {
    private  Integer marathonId;
    private  Integer year;
    private  Integer month;
    private String title;
    private String startDate;
    private String endDate;
    private String regStart;
    private String regEnd;
    private String location;
    private String homepage;
    private String distancesKm;
    private String bgImageUrls;
}
