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
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final FileUploadService fileUploadService;
    private final TokenProvider tokenProvider;

    public MemberInfoRes getMemberInfo(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        return MemberInfoRes.from(memberFromAccessToken);
    }

    public boolean memberDelete(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        } else {
            memberRepository.findById(memberId);
            return true;
        }
    }

    public MemberNicknameRes updateNickname(Long memberId, UpdateNicknameReq request, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if(!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ID);
        } else  {
            Member findMember = memberRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
            String newNickname = "";
            newNickname = request.getNickname();
            findMember.updateNickname(newNickname);
            Member updateMember = memberRepository.save(findMember);

            return MemberNicknameRes.from(updateMember);
        }

    }


    public String updateImage(Long memberId, MultipartFile file, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        if (!(memberFromAccessToken.getImage() == null || memberFromAccessToken.getImage().isEmpty())) {
            fileUploadService.delete(memberFromAccessToken.getImage());
        }

        String imgUrl = fileUploadService.save("member/", file);
        memberFromAccessToken.updateImage(imgUrl);

        memberRepository.save(memberFromAccessToken);

        return imgUrl;
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
    }

}
