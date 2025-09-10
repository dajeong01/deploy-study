package com.korit.running_back_s2.domain.wishList;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WishListMapper {
    List<WishList> getWishs(Integer userId);
    int insertWish(WishList wishList);
    int deleteWish(WishList wishList);
}
