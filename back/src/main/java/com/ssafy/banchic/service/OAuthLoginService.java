package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.TokenDto;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.type.OAuthProvider;
import com.ssafy.banchic.oauthApi.response.OAuthInfoResponse;
import com.ssafy.banchic.oauthApi.response.RequestOAuthInfoService;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OAuthLoginService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final RequestOAuthInfoService requestOAuthInfoService;

    public LoginResult login(String code, OAuthProvider oAuthProvider, HttpServletResponse response) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(oAuthProvider, code);
        String email = oAuthInfoResponse.getEmail();
        Member member = findOrCreateMember(oAuthInfoResponse);

        String nickname = member.getNickname();
        TokenDto tokenDto = tokenProvider.generateTokenDto(member);

        response.addHeader("Authorization", "Bearer " + tokenDto.getAccessToken());
        response.addHeader("RefreshToken", tokenDto.getRefreshToken());

        return new LoginResult(member.getId(), oAuthProvider, nickname, email);
    }

    public void generateNewToken(HttpServletRequest request, HttpServletResponse response) {
        String authorization = request.getHeader("Authorization");
        String refreshToken = request.getHeader("RefreshToken");
        String newToken = tokenProvider.renewAccessToken(authorization, refreshToken);
        response.addHeader("Authorization", "Bearer " + newToken);
        response.addHeader("RefreshToken", refreshToken);
    }

    private Member findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        return memberRepository.findByEmail(oAuthInfoResponse.getEmail())
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }

    private Member newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return memberRepository.save(member);
    }

    /**
     * email, oauthProvider 를 통해서, 접근한 유저가 닉네임이 있는 유저인지, 아닌지 조회
     * 조회한 후에, 여기서 NicknameResponse에 null이 들어가는 지 , 닉네임이 들어가는 지 체크하고
     * 있으면 로그인, 없으면 최초 등록
     */
    private NicknameResponse findMemberNickname(String email, String provider) {
        String nickname = null;
        if(OAuthProvider.KAKAO.name().equalsIgnoreCase(provider)) {
            Member findMember = memberRepository.findByEmailAndOAuthProvider(email, OAuthProvider.KAKAO);
            nickname = findMember.getNickname();
        }
        else if(OAuthProvider.NAVER.name().equalsIgnoreCase(provider)) {
            Member findMember = memberRepository.findByEmailAndOAuthProvider(email, OAuthProvider.NAVER);
            nickname = findMember.getNickname();
        }

        return new NicknameResponse(nickname);
    }

    /**
     * nickname 전체 조회를 통해서, 사용중인 닉네임이면 false, 사용중인 닉네임이 아니면 true
     * @param nickname
     * @return
     */
    private boolean existNickName(String nickname) {
        boolean existNickname = memberRepository.findByNickname(nickname);
        return !existNickname;
    }

    @Data
    @AllArgsConstructor
    public static class LoginResult {
        private final Long userId;
        private final OAuthProvider oAuthProvider;
        private final String nickname;
        private final String email;
    }

    @Data
    @AllArgsConstructor
    public static class NicknameResponse {
        private final String nickname;
    }

}
