package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.domain.dto.response.PerfumeOverviewRes;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.domain.dto.response.ReviewRes;
import com.ssafy.banchic.service.HeartService;
import com.ssafy.banchic.service.MemberService;
import com.ssafy.banchic.service.PerfumeReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Member", description = "Member 관련 API 입니다.")
@RestController
@AllArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final HeartService heartService;
    private final MemberService memberService;
    private final PerfumeReviewService perfumeReviewService;

    @Operation(
            summary = "본인이 좋아요한 향수 목록 조회",
            description = "맴버가 좋아요한 향수 목록에 대한 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "향수 목록이 정상적으로 조회됬습니다."
    )
    @GetMapping("/{memberId}/hearts")
    public ResponseEntity<CommonResponse> getMemberHeart(@PathVariable("memberId") Long memberId,
                                                         HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(CommonResponse.builder()
                .message("맴버가 좋아요한 향수 목록 조회")
                .data(memberService.getMemberHeart(memberId, httpServletRequest))
                .build());
    }

    @Operation(
            summary = "본인이 쓴 리뷰 목록 조회",
            description = "본인이 작성한 리뷰에 대한 목록을 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "리뷰 목록이 정상적으로 조회됬습니다."
    )
    @GetMapping("/{memberId}/reviews")
    public ResponseEntity<CommonResponse> getMemberReview(@PathVariable("memberId") Long memberId,
                                                          HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(CommonResponse.builder()
                .message("맴버가 작성한 리뷰 목록 조회")
                .data(memberService.getMemberReview(memberId, httpServletRequest))
                .build());
    }

    @Operation(
            summary = "본인 정보 조회",
            description = "본인의 정보에 대해서 조회합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "본인 정보 조회에 성공하였습니다."
    )
    @GetMapping("/{memberId}/info")
    public ResponseEntity<CommonResponse> getMemberInfo(
            @PathVariable("memberId") Long memberId, HttpServletRequest httpServletRequest) {
        MemberInfoRes memberInfoResDto = memberService.getMemberInfo(memberId, httpServletRequest);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 정보 조회 성공")
                .data(memberInfoResDto)
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "맴버 삭제",
            description = "본인 정보를 삭제합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "본인 정보 삭제에 성공하였습니다."
    )
    @DeleteMapping("/{memberId}")
    public ResponseEntity<CommonResponse> delete(@PathVariable("memberId") Long memberId, HttpServletRequest httpServletRequest) {
        memberService.delete(memberId, httpServletRequest);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 삭제 완료")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "닉네임 변경",
            description = "맴버의 닉네임을 변경합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "닉네임 변경에 성공하였습니다."
    )
    @PutMapping("/{memberId}/nickname")
    public ResponseEntity<CommonResponse> updateNickname(
            @PathVariable("memberId") Long memberId, @RequestBody UpdateNicknameReq updateNicknameReq
            , HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(CommonResponse.builder()
                .message("닉네임 수정 완료")
                .data(memberService.updateNickname(memberId, updateNicknameReq, httpServletRequest))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "프로필 이미지 수정",
            description = "프로필 이미지를 변경합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "프로필 변경에 성공하였습니다."
    )
    @PutMapping("/{memberId}/image")
    public ResponseEntity<CommonResponse> updateProfileImage(
            @PathVariable("memberId") Long memberId,
            @RequestPart(value = "file", required = false) MultipartFile file,
            HttpServletRequest httpServletRequest) {
        return new ResponseEntity<>(CommonResponse.builder()
                .message("프로필 이미지 수정 완료")
                .data(memberService.updateImage(memberId, file, httpServletRequest))
                .build(), HttpStatus.OK);
    }

}
