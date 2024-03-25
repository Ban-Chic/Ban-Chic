package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.domain.dto.response.MemberNicknameRes;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    public MemberInfoRes getMemberInfo(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        return MemberInfoRes.from(memberFromAccessToken);
    }

    public boolean memberDelete(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isPresent()) {
            memberRepository.deleteById(memberId);
            return true;
        }
        return false;
    }

    public MemberNicknameRes updateNickname(Long memberId, UpdateNicknameReq request) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        String newNickname = "";
        if(findMember.isPresent()) {
            newNickname = request.getNickname();
            findMember.get().updateNickname(newNickname);
            memberRepository.save(findMember.get());
        }

        return MemberNicknameRes.builder()
                .nickname(newNickname)
                .build();
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
    }

}
