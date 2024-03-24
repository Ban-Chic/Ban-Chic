package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.request.UpdateNicknameRequest;
import com.ssafy.banchic.domain.dto.response.MemberInfoResponse;
import com.ssafy.banchic.domain.dto.response.MemberNicknameResponse;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberInfoResponse memberInfo(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isPresent()) {
            MemberInfoResponse findMemberInfo = MemberInfoResponse.builder()
                    .nickname((findMember.get().getNickname()))
                    .image(findMember.get().getImage())
                    .email(findMember.get().getEmail())
                    .build();
            return findMemberInfo;
        }
        return null;
    }

    public boolean memberDelete(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isPresent()) {
            memberRepository.deleteById(memberId);
            return true;
        }
        return false;
    }

    public MemberNicknameResponse updateNickname(Long memberId, UpdateNicknameRequest request) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        String newNickname = "";
        if(findMember.isPresent()) {
            newNickname = request.getNickname();
            findMember.get().changeNickname(newNickname);
            memberRepository.save(findMember.get());
        }

        return MemberNicknameResponse.builder()
                .nickname(newNickname)
                .build();
    }

}
