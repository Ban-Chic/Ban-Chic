package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.entity.Heart;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.repository.HeartRepository;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.repository.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final MemberRepository memberRepository;
    private final PerfumeRepository perfumeRepository;
    private final HeartRepository likesRepository;

    @Transactional
    public void addLike(Long perfumeId, Long memberId) {
        Optional<Perfume> findPerfume = perfumeRepository.findById(perfumeId);
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isPresent() && findPerfume.isPresent()) {
            Perfume likePerfume = findPerfume.get();
            Member likeMember = findMember.get();
            if(!likesRepository.existsByMemberAndPerfume(likeMember, likePerfume)) {
                // 값이 없으면 좋아요를 추가합니다.
                likePerfume.increaseLike();
                likesRepository.save(new Heart(likeMember, likePerfume));
                // 외래키로 member와 perfume을 묶어서 객체로 저장한다.
            } else {
                likePerfume.decreaseLike();
                likesRepository.deleteByMemberAndPerfume(likeMember, likePerfume);
            }
        }
    }
}
