package com.ssafy.banchic.domain.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UpdateNicknameRequest {
    private String nickname;
}
