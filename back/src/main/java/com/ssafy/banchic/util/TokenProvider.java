package com.ssafy.banchic.util;

import com.ssafy.banchic.domain.UserDetailsImpl;
import com.ssafy.banchic.domain.dto.TokenDto;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.RefreshToken;
import com.ssafy.banchic.domain.type.MemberType;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.RefreshTokenRepository;
import com.ssafy.banchic.tokens.AuthTokens;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_PREFIX = "Bearer ";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24;  // 24 시간
    private static final long REFRESH_TOKEN_EXPRIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일

    private final Key key;

    private final RefreshTokenRepository refreshTokenRepository;

    public TokenProvider(@Value("${jwt.secret}") String secretKey, RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenDto generateTokenDto(Member member) {
        long now = (new Date().getTime());

        // AccessToken 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
            .setSubject(member.getId().toString())  // memberId
            .claim(AUTHORITIES_KEY, MemberType.ROLE_MEMBER.toString())
            .setExpiration(accessTokenExpiresIn)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        // RefreshToken 생성
        // (AccessToken의 재발급 목적으로 만들어진 토큰이므로 만료기한 외 별다른 정보를 담지 않는다)
        String refreshToken = Jwts.builder()
            .setExpiration(new Date(now + REFRESH_TOKEN_EXPRIRE_TIME))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();

        RefreshToken refreshTokenObject = RefreshToken.builder()
            .id(member.getId().toString())
            .member(member)
            .keyValue(refreshToken)
            .build();

        refreshTokenRepository.save(refreshTokenObject);

        return TokenDto.builder()
            .grantType(BEARER_PREFIX)
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    public boolean validateToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT signature, 유효하지 않는 JWT 서명 입니다.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token, 만료된 JWT token 입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token, 지원되지 않는 JWT 토큰 입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT claims is empty, 잘못된 JWT 토큰 입니다.");
        }
        return false;
    }

    public AuthTokens renewAccessToken(String accessToken, String refreshToken) {
        try {
            // 리프레시 토큰을 사용하여 새로운 액세스 토큰 생성
            long now = (new Date()).getTime();
            Date accessTokenExpiredAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
            // 기존 리프레시 토큰을 그대로 사용하거나, 새로 생성해야 한다면 그 로직을 추가할 수 있습니다.
            // 여기에서는 기존 리프레시 토큰을 그대로 사용하도록 가정합니다.
            String subject = extractMemberId(accessToken).toString();
            String newAccessToken = generate(subject, accessTokenExpiredAt);

            return AuthTokens.of(newAccessToken, refreshToken, "Bearer", ACCESS_TOKEN_EXPIRE_TIME / 1000L);
        } catch (Exception e) {
            throw new RuntimeException("Error renewing access token", e);
        }
    }

    private String generate(String subject, Date expiredAt) {
        return Jwts.builder()
            .setSubject(subject)
            .setExpiration(expiredAt)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();
    }

    public Long extractMemberId(String accessToken) {
        return Long.valueOf(extractSubject(accessToken));
    }

    private String extractSubject(String accessToken) {
        Claims claims = parseClaims(accessToken);
        return claims.getSubject();
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    @Transactional
    public Member getMemberFromAccessToken(HttpServletRequest request) {
        if (null == request.getHeader("Authorization")) {
            throw new CustomException(ErrorCode.BLANK_TOKEN_HEADER);
        }

        return validateMember(request);
    }

    @Transactional
    public Member validateMember(HttpServletRequest request) {
//        String tokenFromHeader = request.getHeader("RefreshToken");
        String tokenFromHeader = request.getHeader("Authorization");
        if (!validateToken(tokenFromHeader)) {
            throw new CustomException(ErrorCode.INVALID_TOKEN);
        }

        Member member = getMemberFromAuthentication();
        isPresentRefreshToken(member);

        return member;
    }

    public Member getMemberFromAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
            || AnonymousAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            throw new CustomException(ErrorCode.NOT_FOUND_AUTHENTICATION);
        }
        return ((UserDetailsImpl) authentication.getPrincipal()).getMember();
    }

    @Transactional(readOnly = true)
    public RefreshToken isPresentRefreshToken(Member member) {
        return refreshTokenRepository.findByMember(member)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_REFRESH_TOKEN));
    }

}