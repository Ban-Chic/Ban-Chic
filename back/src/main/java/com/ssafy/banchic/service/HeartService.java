package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.entity.Heart;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.HeartRepository;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.repository.PerfumeRepository;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final MemberRepository memberRepository;
    private final PerfumeRepository perfumeRepository;
    private final HeartRepository heartRepository;
    private final TokenProvider tokenProvider;

    @Transactional
    public void addHeart(Long perfumeId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        Perfume findPerfume = perfumeRepository.findById(perfumeId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        if (!heartRepository.existsByMemberAndPerfume(memberFromAccessToken, findPerfume)) {
            // 값이 없으면 좋아요를 추가합니다.
            findPerfume.increaseHeart();
            heartRepository.save(new Heart(memberFromAccessToken, findPerfume));
            // 외래키로 member와 perfume을 묶어서 객체로 저장한다.
        } else {
            findPerfume.decreaseHeartCnt();
            heartRepository.deleteByMemberAndPerfume(memberFromAccessToken, findPerfume);
        }
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
    }

}
