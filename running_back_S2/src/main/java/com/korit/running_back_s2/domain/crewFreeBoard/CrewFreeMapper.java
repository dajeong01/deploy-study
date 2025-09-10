package com.korit.running_back_s2.domain.crewFreeBoard;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewFreeMapper {

    List<CrewFree> findAllFreeListBySearchOption(CrewFreeSearchOption opt);

    Integer countFreeListsBySearchOption(CrewFreeSearchOption opt);


    void insert(CrewFree crewFree);

    List<CrewFree> findDetailById(@Param("crewId") int crewId, @Param("freeId") int freeId);

    void updateContent(CrewFree newcrewFree);

    void deleteFeed(Integer crewId, Integer freeId);

    List<String> findAllTest(Integer crewId);
}
