package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.domain.member.MemberMapper;
import com.korit.running_back_s2.domain.member.MemberSearchOption;
import com.korit.running_back_s2.domain.welcome.WelcomeMapper;
import com.korit.running_back_s2.dto.member.MemberRoleUpdateReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final WelcomeMapper welcomeMapper;
    private final CrewMapper crewMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final PrincipalUtil principalUtil;

    public PaginationRespDto<Member> getMembers(Integer page, Integer size, Integer crewId, String searchText) {
        MemberSearchOption opt = MemberSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<Member> contents = memberMapper.findAllMembersBySearchOption(opt).stream().map(member -> {
            member.getUser().setPicture(imageUrlUtil.buildImageUrl(member.getUser().getPicture(), "profile"));
            return member;
        }).collect(Collectors.toList());

        Integer totalElements = memberMapper.countMembersBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<Member>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public Member getMemberDetail(Integer memberId) {
        Member foundMemberDetail = memberMapper.findById(memberId);
        foundMemberDetail.getUser().setPicture(imageUrlUtil.buildImageUrl(foundMemberDetail.getUser().getPicture(), "profile"));
        return foundMemberDetail;
    }

    public void updateRole(MemberRoleUpdateReqDto dto) {
        int updated = memberMapper.updateRole(dto.getMemberId(), dto.getRoleId());
        if (updated == 0) {
            throw new IllegalStateException("권한 변경 중 오류");
        }
        if (dto.getRoleId() == 1) {
            Member member = memberMapper.findById(dto.getMemberId());
            crewMapper.updateCrewLeader(dto.getCrewId(), member.getUserId());
        }
    }

    public void expel(Integer memberId) {
        memberMapper.deleteWelcomeByMemberId(memberId);
        int deleted = memberMapper.deleteMember(memberId);
        if (deleted == 0) {
            throw new IllegalStateException("리더는 추방할 수 없거나 대상이 존재하지 않습니다.");
        }
    }

    public void registerMember(Member member) {
        welcomeMapper.update(member);
        memberMapper.insert(member);
    }

    public Integer countMember(Integer crewId) {
        return memberMapper.countMember(crewId);
    }

    public Integer getMemberId (Integer crewId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        return memberMapper.findMemberIdByCrewIdAndUserId(crewId, userId);
    }

    public void withDrawMember (Integer memberId) {
        memberMapper.deleteWelcomeByMemberId(memberId);
        int deleted = memberMapper.deleteMember(memberId);
        if (deleted == 0) {
            throw new IllegalStateException("리더는 탈퇴할 수 없거나 대상이 존재하지 않습니다.");
        }
    }

    public List<Member> getMembers(Integer crewId) {
        List<Member> memberList = memberMapper.getMembers(crewId).stream().map(member -> {
            member.getUser().setPicture(imageUrlUtil.buildImageUrl(member.getUser().getPicture(), "profile"));
            return member;
        }).collect(Collectors.toList());
        return memberList;
    }
}
