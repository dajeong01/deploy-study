import api from "../axios";

export const removeWishlist = (data) => api.delete(`/api/wishlist`, {data});

export const addWishlist = (data) => api.post(`/api/wishlist`, data);

export const getUserWishlist = (userId) => api.get(`/api/wishlist/${userId}`);