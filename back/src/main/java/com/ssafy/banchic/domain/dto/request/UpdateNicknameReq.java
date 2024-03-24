package com.ssafy.banchic.domain.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UpdateNicknameReq {
    private String nickname;
}
