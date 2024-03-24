package com.ssafy.banchic.oauthApi.params;

import com.ssafy.banchic.domain.type.OAuthProvider;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
}
/**
 * MultiValueMap
 * -> Extension of the Map interface that stores multiple values.
 * example
 * multiValueMap.add("test",1);
 * multiValueMap.add("test",2);
 * 실행 결과
 * multiValueMap = {test=[1, 2]}
 */

