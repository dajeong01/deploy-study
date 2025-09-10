package com.korit.running_back_s2.dto.wishlist;

import lombok.Data;

@Data
public class WishListRes {
    private Integer wishlistId;
    private Integer userId;
    private Integer crewId;
    private String crewName;
    private String title;
    private String thumbnailPicture;
    private String gunguName;
}
