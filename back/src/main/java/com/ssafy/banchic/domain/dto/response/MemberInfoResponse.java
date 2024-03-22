package com.ssafy.banchic.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberInfoResponse {
    private String email;
    private String image;
    private String nickname;
}
