package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.welcome.Welcome;
import com.korit.running_back_s2.domain.welcome.WelcomeMapper;
import com.korit.running_back_s2.dto.welcome.MyWelcomesResDto;
import com.korit.running_back_s2.dto.welcome.WelcomeReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeResDto;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WelcomeService {

    private final WelcomeMapper welComeMapper;
    private final ImageUrlUtil imageUrlUtil;

    public List<WelcomeResDto> getWelcomes(Integer crewId) {
        return welComeMapper.findAllByCrewId(crewId);
    }

    public void registerWelcome(Integer crewId, WelcomeReqDto dto) {
        Welcome welcome = dto.welcome(crewId);
        Welcome foundWelcome = welComeMapper.findByUserId(welcome);
        if (foundWelcome != null) {
            return;
        }
        welComeMapper.insert(welcome);
    }

    public void reject(Integer welcomeId) {
        welComeMapper.deleteRejectedAfter7Days();
        welComeMapper.statusReject(welcomeId);
    }

    public List<MyWelcomesResDto> getMyWelcomes(Integer userId) {
        List<MyWelcomesResDto> myWelcomeList = welComeMapper.findAllByUserId(userId).stream().map(welcome -> {
            welcome.setProfilePicture(imageUrlUtil.buildImageUrl(welcome.getProfilePicture(), "crewProfile"));
            return welcome;
        }).collect(Collectors.toList());
        return myWelcomeList;
    }
}
