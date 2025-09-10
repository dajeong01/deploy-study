package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.wishList.WishList;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishListController {

    private final WishListService wishListService;

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDto<?>> getWishList(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(wishListService.getWishs(userId)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> RegisterWish (@RequestBody WishList wishList) {
        wishListService.addWish(wishList);
        return ResponseEntity.ok(ResponseDto.success("wishlist 등록 완료"));
    }
    @DeleteMapping
    public ResponseEntity<ResponseDto<?>> DeleteWish (@RequestBody WishList wishList) {
        wishListService.removeWish(wishList);
        return ResponseEntity.ok(ResponseDto.success("wishlist 삭제 완료"));
    }
}
