package com.korit.running_back_s2.domain.myPost;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPostSearchOption {
    private Integer userId;
    private Integer startIndex;
    private Integer size;
    private String searchText;
    private String src;
    private Integer crewId;
}


