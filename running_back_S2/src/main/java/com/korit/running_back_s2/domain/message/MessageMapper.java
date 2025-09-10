package com.korit.running_back_s2.domain.message;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MessageMapper {
    List<Message> getCrewMessage(Integer crewId);

    void insertCrewMessage(Message message);
}
