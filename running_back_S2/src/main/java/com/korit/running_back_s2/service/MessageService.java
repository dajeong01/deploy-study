package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.message.Message;
import com.korit.running_back_s2.domain.message.MessageMapper;
import com.korit.running_back_s2.dto.message.MessageReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageMapper messageMapper;

    public List<Message> getCrewMessage(Integer crewId) {
        return messageMapper.getCrewMessage(crewId);
    }

    public void registerCrewMessage(Integer crewId, MessageReqDto dto) {
        Message message = Message.builder()
                .crewId(crewId)
                .content(dto.getContent())
                .build();
        messageMapper.insertCrewMessage(message);
    }
}
