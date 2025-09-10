package com.korit.running_back_s2.domain.gungu;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GunguMapper {
    List<Gungu> getAllGungu();
    Integer findGunguIdByName(String gunguName);
}
