package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.type.OAuthProvider;
import com.ssafy.banchic.oauthApi.params.OAuthLoginParams;
import com.ssafy.banchic.oauthApi.response.OAuthInfoResponse;
import com.ssafy.banchic.oauthApi.response.RequestOAuthInfoService;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.tokens.AuthTokens;
import com.ssafy.banchic.tokens.AuthTokensGenerator;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthLoginService {
    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final RequestOAuthInfoService requestOAuthInfoService;

//    public AuthTokens login(OAuthLoginParams params) {
//        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params);
//        // param 값을 통한, access, refresh, grantType, 유효시간을 반환한다.
//        Long memberId = findOrCreateMember(oAuthInfoResponse);
//        AuthTokens generateToken = authTokensGenerator.generate(memberId);
//        Optional<Member> member = memberRepository.findById(memberId);
//        log.info("find member : {}", member.get().getId());
//        if(member.isPresent()) {
//            log.info("generateToken : {}", generateToken.getRefreshToken());
//            member.get().changeRefreshToken(generateToken.getRefreshToken());
//            memberRepository.save(member.get());
//            memberRepository.flush();
//            log.info("member provider : {}", member.get().getOAuthProvider());
//            log.info("member name : {}", member.get().getEmail());
//            log.info("member refresh : {}", member.get().getRefreshToken());
//        } else {
//            log.debug("Not found Member : {}", memberId);
//        }
//        return generateToken;
//        // JWT 토큰으로 엑세스 토큰, 리프래쉬 토큰이 만들어져서 리턴된다
//    }

    public LoginResult login(String code, OAuthLoginParams params, HttpServletResponse response) {
        OAuthInfoResponse oAuthInfoResponse = requestOAuthInfoService.request(params, code);
        OAuthProvider oAuthProvider = oAuthInfoResponse.getOAuthProvider();
        String email = oAuthInfoResponse.getEmail();
        Long memberId = findOrCreateMember(oAuthInfoResponse);
        Optional<Member> member = memberRepository.findById(memberId);

        String nickname = member.get().getNickname();
        AuthTokens authTokens = authTokensGenerator.generate(memberId);

        response.addHeader("Authorization", "Bearer " + authTokens.getAccessToken());
        response.addHeader("RefreshToken", authTokens.getRefreshToken());

        return new LoginResult(memberId, oAuthProvider, nickname, email);
    }

    public AuthTokens generateNewToken(String accessToken, String refreshToken) {
        return authTokensGenerator.renewAccessToken(accessToken, refreshToken);
    }


    private Long findOrCreateMember(OAuthInfoResponse oAuthInfoResponse) {
        return memberRepository.findByEmail(oAuthInfoResponse.getEmail())
                .map(Member::getId)
                .orElseGet(() -> newMember(oAuthInfoResponse));
    }

    private Long newMember(OAuthInfoResponse oAuthInfoResponse) {
        Member member = Member.builder()
                .email(oAuthInfoResponse.getEmail())
                .nickname(oAuthInfoResponse.getNickname())
                .oAuthProvider(oAuthInfoResponse.getOAuthProvider())
                .build();

        return memberRepository.save(member).getId();
    }

    /**
     * email, oauthProvider 를 통해서, 접근한 유저가 닉네임이 있는 유저인지, 아닌지 조회
     * 조회한 후에, 여기서 NicknameResponse에 null이 들어가는 지 , 닉네임이 들어가는 지 체크하고
     * 있으면 로그인, 없으면 최초 등록
     *
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
        if(existNickname)
            return false;
        else
            return true;
    }

    private Member findMember(OAuthInfoResponse oAuthInfoResponse) {
        Optional<Member> findMember = memberRepository.findByEmail(oAuthInfoResponse.getEmail());

        return findMember.orElse(null);
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

    @Data
    @AllArgsConstructor
    public static class NicknameRequest {
        private final String email;
        private final String provider;
    }
}
