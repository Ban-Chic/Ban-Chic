package com.ssafy.banchic.controller;

import com.ssafy.banchic.common.CommonResponse;
import com.ssafy.banchic.oauthApi.params.KakaoLoginParams;
import com.ssafy.banchic.oauthApi.params.NaverLoginParams;
import com.ssafy.banchic.oauthApi.params.NaverLogoutParams;
import com.ssafy.banchic.oauthApi.params.OauthTokenParams;
import com.ssafy.banchic.service.OAuthLoginService;
import com.ssafy.banchic.service.OAuthLogoutService;
import com.ssafy.banchic.tokens.AuthTokens;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final OAuthLoginService oAuthLoginService;
    private final OAuthLogoutService oAuthLogoutService;
    private final RestTemplate restTemplate;

    @Value("${oauth.kakao.url.logout}")
    private String kakaoLogoutUrl;
    @Value("${oauth.kakao.client-id}")
    private String kakaoClientId;
    @Value("${oauth.kakao.url.redirect}")
    private String kakaoLogoutRedirectUrl;

    /**
     * 로그인 할 때, params를 통해서 소셜 로그인을 진행하고, 닉네임 유무를 체크
     * @param params
     * @return
     */
    @PostMapping("/login/kakao")
    public ResponseEntity<CommonResponse> loginKakao(
        @RequestParam("code") String code, KakaoLoginParams params, HttpServletResponse response) {
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("카카오 로그인 성공")
                .data(oAuthLoginService.login(code, params, response))
                .build(), HttpStatus.OK);
    }

    @PostMapping("/login/naver")
    public ResponseEntity<CommonResponse> loginNaver(
        @RequestParam("code") String code, NaverLoginParams params, HttpServletResponse response) {
        return new ResponseEntity<>(CommonResponse.builder()
                .status(HttpStatus.OK.value())
                .message("네이버 로그인 성공")
                .data(oAuthLoginService.login(code, params, response))
                .build(), HttpStatus.OK);
    }

    /**
     * access token -> 소셜 로그인의 access를 지우는 방식
     * 로그아웃 하면 , 소셜의 access token, jwt 토큰도 둘 다 무효화
     * jwt token을 무효화 시킴
     * @param params
     * @return
     */

    @PostMapping("/logout/naver")
    public ResponseEntity<CommonResponse> logoutNaver(@RequestBody NaverLogoutParams params) {
//        return ResponseEntity.ok(oAuthLogoutService.logout(params));
        return new ResponseEntity<>(CommonResponse.builder()
                .message("네이버 로그아웃 성공")
                .data(oAuthLogoutService.logout(params))
                .build(), HttpStatus.OK);
    }

    @GetMapping("/logout/kakao")
    public ResponseEntity<CommonResponse> logoutKakao(@RequestHeader("Authorization") String accessToken) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", kakaoClientId);
        params.add("logout_redirect_uri", kakaoLogoutRedirectUrl);
//        params.add("state", "your_unique_state_value"); // CSRF 방지를 위한 임의의 문자열

        // 로그아웃 URL 생성
        String url = "https://kauth.kakao.com/oauth/logout" + "?" +
                params.entrySet().stream()
                        .map(entry -> entry.getKey() + "=" + entry.getValue().get(0))
                        .reduce((p1, p2) -> p1 + "&" + p2)
                        .orElse("");

        // 로그아웃 요청
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if (response.getStatusCode() == HttpStatus.FOUND) {
            // 로그아웃이 성공적으로 수행되었을 경우
            return new ResponseEntity<>(CommonResponse.builder()
                    .message("카카오 로그아웃 성공")
                    .build(), HttpStatus.OK);
        } else {
            // 로그아웃이 실패한 경우
            return new ResponseEntity<>(CommonResponse.builder()
                    .message("카카오 로그아웃 실패")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/extend/token")
    public ResponseEntity<AuthTokens> extendToken(@RequestHeader("Authorization") String accessToken,
                                                  @RequestBody OauthTokenParams params) {
        return ResponseEntity.ok(oAuthLoginService.generateNewToken(accessToken, params.getRefreshToken()));
    }

}
