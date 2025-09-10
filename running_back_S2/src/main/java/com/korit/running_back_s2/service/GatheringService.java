package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.Gathering;
import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.gathering.GatheringUpdateReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatheringService {

    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final GatheringMapper gatheringMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final ParticipantMapper participantMapper;

    @Transactional(rollbackFor = Exception.class)
    public void register(GatheringRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "crewGathering");
        Gathering gathering = dto.toEntity();
        gathering.setUserId(userId);
        gathering.setThumbnailPicture(thumbnailImg);

        gatheringMapper.insert(gathering);
        participantMapper.insert(gathering.getGatheringId(), userId);
    }

    public List<Gathering> getGatherings(Integer crewId) {
//        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
//        List<Gathering> gatherings = gatheringMapper.findAllByCrewId(crewId, userId);
        List<Gathering> gatherings = gatheringMapper.findAllByCrewId(crewId);
        gatherings.forEach(g -> {
            if (g.getThumbnailPicture() != null) {
                g.setThumbnailPicture(imageUrlUtil.buildImageUrl(g.getThumbnailPicture(), "crewGathering"));
            }
        });
        return gatherings;
    }

    public List<User> getGatheringParticipants(int gatheringId) {
        List<User> participants = gatheringMapper.findParticipantsByGatheringId(gatheringId).stream().map(p -> {
            p.setPicture(imageUrlUtil.buildImageUrl(p.getPicture(), "profile"));
            return p;
        }).collect(Collectors.toList());
        return participants;
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateGathering(Integer gatheringId, GatheringUpdateReqDto dto) {

        Gathering gathering = dto.toEntity();

        System.out.println(gathering);
        if (dto.getThumbnailPicture() != null && !dto.getThumbnailPicture().isEmpty()) {
            final String imageConfigName = "crewGathering";

            String newFileName = fileService.uploadFile(dto.getThumbnailPicture(), imageConfigName);
            gathering.setThumbnailPicture(newFileName);
            Gathering foundGathering = gatheringMapper.findByGatheringId(gatheringId);

            fileService.deleteFile(imageConfigName, foundGathering.getThumbnailPicture());
        }

        gatheringMapper.update(gathering);
    }

    public Gathering getGatheringDetail(Integer gatheringId) {
        Gathering foundGathering = gatheringMapper.findByGatheringId(gatheringId);
        foundGathering.setThumbnailPictureUrl(imageUrlUtil);
        return foundGathering;
    }
}
