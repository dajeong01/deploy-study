package com.korit.running_back_s2.domain.globalFreeBoard;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GlobalFreeMapper {

    List<GlobalFree> findAllFreeListBySearchOption(GlobalFreeSearchOption opt);

    Integer countFreeListsBySearchOption(GlobalFreeSearchOption opt);

    void insert(GlobalFree globalFree);

    List<GlobalFree> findDetailById(@Param("freeId") int freeId);

    void updateContent(GlobalFree newglobalFree);

    void deleteFeed(Integer freeId);
}
