package com.ssafy.banchic.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberNicknameResponse {
    private String nickname;
}
