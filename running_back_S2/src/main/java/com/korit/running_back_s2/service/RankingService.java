package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.ranking.CrewRankingGroupRespDto;
import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import com.korit.running_back_s2.dto.ranking.UserRankingGroupRespDto;
import com.korit.running_back_s2.dto.ranking.UserRankingRespDto;
import com.korit.running_back_s2.util.ImageUrlUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final CrewMapper crewMapper;
    private final UserMapper userMapper;
    private final ImageUrlUtil imageUrlUtil;

    private CrewRankingGroupRespDto cachedCrewRankings;
    private LocalDateTime lastUpdatedCrew;
    private static final Duration CREW_CACHE_DURATION = Duration.ofDays(1);

    private UserRankingGroupRespDto cachedUserRankings;
    private LocalDateTime lastUpdatedUser;
    private static final Duration USER_CACHE_DURATION = Duration.ofDays(1); // 하루 단위

    @PostConstruct
    @Scheduled(cron = "0 0 0 * * *")
    public void updateCrewRankings() {
        cachedCrewRankings = calculateCrewRankingsFromDB();
        lastUpdatedCrew = LocalDateTime.now();
    }

    public CrewRankingGroupRespDto getAllCrewRankings() {
        if (isCrewCacheExpired()) {
            updateCrewRankings();
        }
        return cachedCrewRankings;
    }

    private boolean isCrewCacheExpired() {
        return cachedCrewRankings == null || lastUpdatedCrew == null ||
                Duration.between(lastUpdatedCrew, LocalDateTime.now()).compareTo(CREW_CACHE_DURATION) > 0;
    }

    private CrewRankingGroupRespDto calculateCrewRankingsFromDB() {
        List<CrewRankingRespDto> totalKmRanking = crewMapper.selectTop10CrewRankingByTotalKm().stream().map(crew -> {
            crew.setProfilePicture(imageUrlUtil.buildImageUrl(crew.getProfilePicture(), "crewProfile"));
            return crew;
        }).collect(Collectors.toList());
        List<CrewRankingRespDto> memberRanking = crewMapper.selectTop10CrewRankingByMemberCount().stream().map(crew -> {
            crew.setProfilePicture(imageUrlUtil.buildImageUrl(crew.getProfilePicture(), "crewProfile"));
            return crew;
        }).collect(Collectors.toList());
        List<CrewRankingRespDto> newRanking = crewMapper.selectTop10CrewRankingByCreatedDate().stream().map(crew -> {
            crew.setProfilePicture(imageUrlUtil.buildImageUrl(crew.getProfilePicture(), "crewProfile"));
            return crew;
        }).collect(Collectors.toList());
        crewMapper.updateAllCrewTotalKm();
        return new CrewRankingGroupRespDto(totalKmRanking, memberRanking, newRanking);
    }

    @PostConstruct
    @Scheduled(cron = "0 0 0 * * *")
    public void updateUserRankings() {
        cachedUserRankings = calculateUserRankingsFromDB();
        lastUpdatedUser = LocalDateTime.now();
    }

    public UserRankingGroupRespDto getAllUserRankings() {
        if (isUserCacheExpired()) {
            updateUserRankings();
        }
        return cachedUserRankings;
    }

    private boolean isUserCacheExpired() {
        return cachedUserRankings == null || lastUpdatedUser == null ||
                Duration.between(lastUpdatedUser, LocalDateTime.now()).compareTo(USER_CACHE_DURATION) > 0;
    }

    private UserRankingGroupRespDto calculateUserRankingsFromDB() {
        List<UserRankingRespDto> totalKmRanking = userMapper.selectUserRankingByTotalKm().stream().map(user -> {
            user.setPicture(imageUrlUtil.buildImageUrl(user.getPicture(), "profile"));
            return user;
        }).collect(Collectors.toList());
        List<UserRankingRespDto> gatheringCount = userMapper.selectUserRankingByGatheringCount().stream().map(user -> {
            user.setPicture(imageUrlUtil.buildImageUrl(user.getPicture(), "profile"));
            return user;
        }).collect(Collectors.toList());
        return new UserRankingGroupRespDto(totalKmRanking, gatheringCount);
    }

}
