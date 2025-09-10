package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.wishList.WishList;
import com.korit.running_back_s2.domain.wishList.WishListMapper;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishListService {

    private final WishListMapper wishListMapper;
    private final ImageUrlUtil imageUrlUtil;

    public List<WishList> getWishs (Integer userId) {
        List<WishList> wishListList = wishListMapper.getWishs(userId).stream().map(wishList -> {
            wishList.setThumbnailPicture(imageUrlUtil.buildImageUrl(wishList.getThumbnailPicture(), "crewThumbnail"));
            return wishList;
        }).collect(Collectors.toList());
        return wishListList;
    }

    public void addWish(WishList wishList) {
        wishListMapper.insertWish(wishList);
    }

    public void removeWish(WishList wishList) {
        wishListMapper.deleteWish(wishList);
    }
}
