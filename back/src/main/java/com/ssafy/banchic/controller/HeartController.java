package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.service.HeartService;
import com.ssafy.banchic.service.MemberService;
import com.ssafy.banchic.service.PerfumeService;
import com.ssafy.banchic.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class HeartController {

    private final HeartService likesService;
    private final MemberService memberService;
    private final PerfumeService perfumeService;
    private final TokenProvider tokenProvider;

    @PostMapping("/heart/{perfumeId}")
    public ResponseEntity<CommonResponse> update(@RequestHeader("Authorization") String authorization,
                                                   @PathVariable("perfumeId") Long perfumeId) throws Exception {

        /**
         * 1. jwt token의 값의 유효시간이 남아있는지 체크합니다.
         * 2. 확인된 토큰에 대해서 디코딩을 통해서 memberId의 값을 꺼내옵니다.
         * 3. 꺼내온 값을 통해서, 맴버 아이디와 향수 아이디를 통해서 좋아요 추가 및 삭제를 진행
         */
        log.info("authorization : {}", authorization);
        String accessToken = authorization.substring(7);
        log.info("accessToken : {}", accessToken);
        try {
            if (tokenProvider.validateToken(accessToken)) {
                Long memberId = tokenProvider.extractMemberId(accessToken);
                likesService.addLike(perfumeId, memberId);
                return ResponseEntity.ok(CommonResponse.builder()
                        .message("좋아요가 정상적으로 작동중입니다.")
                        .data(true)
                        .build());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(CommonResponse.builder()
                                .message("토큰이 만료되었습니다.")
                                .data(false)
                                .build());
            }
        } catch (Exception e) {
            log.error("좋아요 추가 도중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.builder()
                            .message("서버 오류로 인해 좋아요를 추가할 수 없습니다.")
                            .data(false)
                            .build());
        }
    }
}
