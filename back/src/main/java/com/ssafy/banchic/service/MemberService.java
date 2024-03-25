package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.domain.dto.response.MemberNicknameRes;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final FileUploadService fileUploadService;

    public MemberInfoRes memberInfo(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        if(findMember.isPresent()) {
            return MemberInfoRes.builder()
                .nickname((findMember.get().getNickname()))
                .image(findMember.get().getImage())
                .email(findMember.get().getEmail())
                .build();
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

    public String updateImage(Long memberId, MultipartFile file) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        if (member.getImage().isEmpty()) {
            fileUploadService.delete(member.getImage());
        }

        String imgUrl = fileUploadService.save("/member", file);
        member.updateImage(imgUrl);

        return imgUrl;
    }

}
