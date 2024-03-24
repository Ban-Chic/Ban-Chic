package com.ssafy.banchic.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND_ID(HttpStatus.BAD_REQUEST, "해당 아이디를 찾을 수 없습니다."),

    FILE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAIL(HttpStatus.BAD_REQUEST, "파일 삭제에 실패했습니다."),
    NOT_VALID_EXTENSION(HttpStatus.BAD_REQUEST, "유효하지 않은 확장자입니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}