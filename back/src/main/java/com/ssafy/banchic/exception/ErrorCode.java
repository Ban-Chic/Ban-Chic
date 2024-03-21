package com.ssafy.banchic.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NON_FOUND_ID(HttpStatus.BAD_REQUEST, "해당 아이디를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}