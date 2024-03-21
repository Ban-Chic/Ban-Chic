package com.ssafy.banchic.common;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class CommonResponse {
    @Builder.Default
    private Date dateTime = new Date();
    @Builder.Default
    private int status = 200;
    private String message;
    private Object data;
}
