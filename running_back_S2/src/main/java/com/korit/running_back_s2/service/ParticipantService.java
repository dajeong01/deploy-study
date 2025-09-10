package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.participant.ParticipantAttendanceUpdateDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantMapper participantMapper;
    private final PrincipalUtil principalUtil;
    private final GatheringMapper gatheringMapper;
    private final UserMapper userMapper;

    @Transactional
    public void attendGathering(Integer gatheringId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        boolean exists = participantMapper.existsByGatheringIdAndUserId(gatheringId, userId);
        if (!exists) {
            participantMapper.insert(gatheringId, userId);
        }

    }

    @Transactional
    public int cancelAttendance(Integer gatheringId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        participantMapper.deleteByGatheringIdAndUserId(gatheringId, userId);

        return participantMapper.countByGatheringId(gatheringId);
    }

    public int getParticipantCount(Integer gatheringId) {
        return participantMapper.countByGatheringId(gatheringId);
    }

    @Transactional
    public void updateParticipantsAttendance(Integer gatheringId, List<ParticipantAttendanceUpdateDto> list) {
        double gatheringKm = gatheringMapper.getKmById(gatheringId);

        // 상태가 바뀐 사람만 모으는 리스트
        List<ParticipantAttendanceUpdateDto> changedList = new ArrayList<>();

        for (ParticipantAttendanceUpdateDto dto : list) {
            Integer currentStatus = participantMapper.getAttendanceStatusById(gatheringId, dto.getUserId());
            if (currentStatus == null) continue;

            if (!currentStatus.equals(dto.getAttendanceStatus())) {
                changedList.add(dto);

                if (currentStatus == 0 && dto.getAttendanceStatus() == 1) {
                    userMapper.updateUserKm(dto.getUserId(), gatheringKm);
                } else if (currentStatus == 1 && dto.getAttendanceStatus() == 0) {
                    userMapper.updateUserKm(dto.getUserId(), -gatheringKm);
                }
            }
        }

        if (!changedList.isEmpty()) {
            int updated = participantMapper.updateAttendance(gatheringId, changedList);
            System.out.println("=== 업데이트된 행 수 : " + updated);
        } else {
            System.out.println("=== 상태 변화 없음 (업데이트 스킵)");
        }
    }



}
