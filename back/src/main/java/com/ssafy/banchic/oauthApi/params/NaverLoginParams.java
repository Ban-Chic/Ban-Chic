package com.ssafy.banchic.oauthApi.params;

import com.ssafy.banchic.domain.type.OAuthProvider;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NaverLoginParams implements OAuthLoginParams {

    @Override
    public OAuthProvider oAuthProvider() {
        return OAuthProvider.NAVER;
    }

}
