package com.korit.running_back_s2.domain.wishList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishList {
    private Integer wishlistId;
    private Integer userId;
    private Integer crewId;
    private String crewName;
    private String title;
    private String thumbnailPicture;
    private String gunguName;
}
