package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.service.HeartService;
import com.ssafy.banchic.service.MemberService;
import com.ssafy.banchic.service.PerfumeService;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/perfumes")
@RequiredArgsConstructor
public class HeartController {

    private final HeartService heartService;

    @PostMapping("/{perfumeId}/hearts")
    public ResponseEntity<CommonResponse> update(HttpServletRequest httpServletRequest,
                                                 @PathVariable("perfumeId") Long perfumeId) {

        /**
         * 1. jwt token의 값의 유효시간이 남아있는지 체크합니다.
         * 2. 확인된 토큰에 대해서 디코딩을 통해서 memberId의 값을 꺼내옵니다.
         * 3. 꺼내온 값을 통해서, 맴버 아이디와 향수 아이디를 통해서 좋아요 추가 및 삭제를 진행
         */
        heartService.addHeart(perfumeId, httpServletRequest);
        return ResponseEntity.ok(CommonResponse.builder()
                .message("좋아요가 정상적으로 작동중입니다.")
                .data(true)
                .build());

    }

    @GetMapping("/{perfumeId}/hearts")
    public ResponseEntity<CommonResponse> getPerfumeHeart(@PathVariable("perfumeId") Long perfumeId, HttpServletRequest httpServletRequest) {

        return ResponseEntity.ok(CommonResponse.builder()
                .message("향수 좋아요 조회")
                .data(heartService.checkHeart(perfumeId, httpServletRequest))
                .build());

    }

}
