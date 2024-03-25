package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}/info")
    public ResponseEntity<CommonResponse> getMemberInfo(
        @PathVariable("memberId") Long memberId, HttpServletRequest httpServletRequest) {
        MemberInfoRes memberInfoResDto = memberService.getMemberInfo(memberId, httpServletRequest);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 정보 조회 성공")
                .data(memberInfoResDto)
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<CommonResponse> delete(@PathVariable("memberId") Long memberId) {
        boolean deleteMember = memberService.memberDelete(memberId);
        if(deleteMember) {
            return new ResponseEntity<>(CommonResponse.builder()
                    .message("유저 삭제 완료")
                    .data(deleteMember)
                    .build(), HttpStatus.OK);
        }
        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 삭제 실패")
                .data(deleteMember)
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{memberId}/nickname")
    public ResponseEntity<CommonResponse> updateNickname(
        @PathVariable("memberId") Long memberId, @RequestBody UpdateNicknameReq request) {
        return new ResponseEntity<>(CommonResponse.builder()
                .message("닉네임 수정 완료")
                .data(memberService.updateNickname(memberId, request))
                .build(), HttpStatus.OK);
    }

    @PutMapping("/{memberId}/image")
    public ResponseEntity<CommonResponse> updateProfileImage (
        @PathVariable("memberId") Long memberId,
        @RequestPart(value = "file", required = false) MultipartFile file,
        HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(CommonResponse.builder()
            .message("프로필 이미지 수정 완료")
            .data(memberService.updateImage(memberId, file, httpServletRequest))
            .build(), HttpStatus.OK);
    }

}
