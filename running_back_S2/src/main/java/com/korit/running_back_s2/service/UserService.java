package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gungu.GunguMapper;
import com.korit.running_back_s2.domain.member.MemberMapper;
import com.korit.running_back_s2.domain.user.DeletedUser;
import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.domain.welcome.WelcomeMapper;
import com.korit.running_back_s2.dto.crew.CrewsByUserIdResDto;
import com.korit.running_back_s2.dto.user.UserGatheringsReqDto;
import com.korit.running_back_s2.dto.user.UserMyPageUpdateReqDto;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.dto.welcome.UpdateMyWelcomeReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeByUserIdResDto;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final GunguMapper gunguMapper;
    private final FileService fileService;
    private final WelcomeMapper welcomeMapper;
    private final PrincipalUtil principalUtil;
    private final MemberMapper memberMapper;
    private final GatheringMapper gatheringMapper;
    private final ImageUrlUtil imageUrlUtil;

    public Map<String, String> register(UserRegisterReqDto dto) {
        User user = dto.toEntity();

        String[] parts = user.getAddress().split(" ");
        String gunguName = parts.length > 1 ? parts[1] : "";

        Integer gunguId = gunguMapper.findGunguIdByName(gunguName);
        user.setGunguId(gunguId);
        userMapper.insert(user);

        String accessToken = jwtUtil.generateAccessToken(user);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);
        return result;
    }

    public void deleteUser (Integer userId) {
        User user = principalUtil.getPrincipalUser().getUser();

        DeletedUser deletedUser = DeletedUser.builder()
                .userId(user.getUserId())
                .oauthType(user.getOauthType())
                .providerId(user.getProviderId())
                .email(user.getEmail())
                .picture(user.getPicture())
                .fullName(user.getFullName())
                .nickname(user.getNickname())
                .gunguId(user.getGunguId())
                .address(user.getAddress())
                .phoneNumber(user.getPhoneNumber())
                .birthDate(user.getBirthDate())
                .gender(user.getGender())
                .totalKm(user.getTotalKm())
                .build();

        userMapper.insertDeleteTb(deletedUser);
        userMapper.deleteUser(userId);
    }


    public String checkNickname(String nickname) {
        User user = userMapper.findByNickname(nickname);
        if (user == null) {
            return "false";
        } else {
            return "true";
        }
    }

    public List<WelcomeByUserIdResDto> getWelcomeByUserId(Integer userId) {
        return userMapper.findWelcomeByUserId(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateUserProfileImg(Integer userId, MultipartFile file) {
        String oldFileName = userMapper.findPictureById(userId);
        String newFileName = fileService.uploadFile(file, "profile");
        userMapper.updateProfileImgById(userId, newFileName);

        if (oldFileName != null && !oldFileName.isBlank()) {
            fileService.deleteFile("profile", oldFileName);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateUserInfo(UserMyPageUpdateReqDto dto) {
        User user = dto.Entity();
        userMapper.updateUser(user);
    }

    public void updateMyWelcome(UpdateMyWelcomeReqDto dto) {
        welcomeMapper.updateMyWelcome(dto);
    }

    public void deleteMyWelcome(Integer welcomeId) {
        welcomeMapper.deleteMyWelcome(welcomeId);
    }

    public List<CrewsByUserIdResDto> getMyCrews (Integer userId) {
        List<CrewsByUserIdResDto> MyCrewList = memberMapper.findCrewsByUserId(userId).stream().map(crews -> {
            crews.setThumbnailPicture(imageUrlUtil.buildImageUrl(crews.getThumbnailPicture(), "crewThumbnail"));
            return crews;
        }).collect(Collectors.toList());
        return MyCrewList;
    }

    public List<UserGatheringsReqDto> getMyGathering (Integer userId) {
        List<UserGatheringsReqDto> gatherings = gatheringMapper.findGatheringByUserId(userId).stream().filter(Objects::nonNull)
                .peek(g -> g.setThumbnailPicture(
                        imageUrlUtil.buildImageUrl(g.getThumbnailPicture(), "crewGathering")
                ))
                .collect(Collectors.toList());

        return gatherings;
    }

}