package com.korit.running_back_s2.domain.ask;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AskMapper {
    List<Ask> findAllAskBySearchOption(AskFreeSearchOption opt);

    Integer countListsBySearchOption(AskFreeSearchOption opt);

    void insert(Ask ask);

    List<Ask> findDetailById(@Param("askId") int askId);

    void insertAnswer(Answer answer);

    void updateIsAnswer(Integer askId);
}
