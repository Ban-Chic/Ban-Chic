package com.ssafy.banchic.oauthApi.params;

import com.ssafy.banchic.domain.type.OAuthProvider;
import org.springframework.util.MultiValueMap;

public interface OAuthLoginParams {
    OAuthProvider oAuthProvider();
    MultiValueMap<String, String> makeBody();
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

