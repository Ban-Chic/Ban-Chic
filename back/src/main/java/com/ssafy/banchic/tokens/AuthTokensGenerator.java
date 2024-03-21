package com.ssafy.banchic.tokens;

import com.ssafy.banchic.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class AuthTokensGenerator {
    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일

    private final JwtTokenProvider jwtTokenProvider;

    public AuthTokens generate(Long memberId) {
        long now = (new Date()).getTime();
        Date accessTokenExpiredAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiredAt = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);

        String subject = memberId.toString();
        String accessToken = jwtTokenProvider.generate(subject, accessTokenExpiredAt);
        String refreshToken = jwtTokenProvider.generate(subject, refreshTokenExpiredAt);

        return AuthTokens.of(accessToken, refreshToken, BEARER_TYPE, ACCESS_TOKEN_EXPIRE_TIME / 1000L);
    }

    public AuthTokens renewAccessToken(String accessToken, String refreshToken) {
        try {
            // 리프레시 토큰을 사용하여 새로운 액세스 토큰 생성
            long now = (new Date()).getTime();
            Date accessTokenExpiredAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
            // 기존 리프레시 토큰을 그대로 사용하거나, 새로 생성해야 한다면 그 로직을 추가할 수 있습니다.
            // 여기에서는 기존 리프레시 토큰을 그대로 사용하도록 가정합니다.
            String subject = extractMemberId(accessToken).toString();
            String newAccessToken = jwtTokenProvider.generate(subject, accessTokenExpiredAt);

            return AuthTokens.of(newAccessToken, refreshToken, BEARER_TYPE, ACCESS_TOKEN_EXPIRE_TIME / 1000L);
        } catch (Exception e) {
            throw new RuntimeException("Error renewing access token", e);
        }
    }


    public Long extractMemberId(String accessToken) {
        return Long.valueOf(jwtTokenProvider.extractSubject(accessToken));
    }
}
