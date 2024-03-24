package com.ssafy.banchic.controller;

import com.ssafy.banchic.common.CommonResponse;
import com.ssafy.banchic.domain.dto.request.UpdateNicknameRequest;
import com.ssafy.banchic.domain.dto.response.MemberInfoResponse;
import com.ssafy.banchic.domain.dto.response.MemberNicknameResponse;
import com.ssafy.banchic.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/members")
public class MeberController {
    private final MemberService memberService;

    @GetMapping("/{memberId}/info")
    public ResponseEntity<CommonResponse> memberInfo(@PathVariable("memberId") Long memberId) {
        MemberInfoResponse memberInfoResponseDto = memberService.memberInfo(memberId);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 정보 조회 성공")
                .data(memberInfoResponseDto)
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}/deleteMember")
    public ResponseEntity<CommonResponse> memberDelete(@PathVariable("memberId") Long memberId) {
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
    public ResponseEntity<CommonResponse> nicknameUpdate(@PathVariable("memberId") Long memberId,
                                                         @RequestBody UpdateNicknameRequest request) {
        MemberNicknameResponse memberNicknameResponse = memberService.updateNickname(memberId, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("닉네임 수정 완료")
                .data(memberNicknameResponse)
                .build(), HttpStatus.OK);
    }
}
