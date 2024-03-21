package com.ssafy.banchic.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;

    // jwt 키를 통해서, base64 인코딩을 통해서, 키를 만든다.
    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // subject는 memberId가 됨,

    /**
     * 유저 아이디와 만료 기간을 통해서, jwt 설정을 하고, signWith에서 key를 통해 서명하고,
     * compact를 통해서 최종적인 jwt 문자열을 만든다.
     * @param subject : 유저 아이디
     * @param expiredAt : 만료 기간
     * @return
     */
    public String generate(String subject, Date expiredAt) {
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(expiredAt)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractSubject(String accessToken) {
        Claims claims = parseClaims(accessToken);
        return claims.getSubject();
    }

    public Long getMemberIdFromToken(String accessToken) {
        return Long.parseLong(extractSubject(accessToken));
    }

    public boolean validToken(String accessToken) throws Exception {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken);
            return true;
        } catch (Exception e) {
            throw new Exception("no valid");
        }
    }

    /**
     * Jwt 토큰을 디코딩하고, 토큰에 포함된 클레임들을 얻는다.
     *
     * @param accessToken : 엑세스 토큰
     * @return
     */

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
}
