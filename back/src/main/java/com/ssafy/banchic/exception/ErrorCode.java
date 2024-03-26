package com.ssafy.banchic.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND_ID(HttpStatus.BAD_REQUEST, "해당 아이디를 찾을 수 없습니다."),
    NOT_FOUND_AUTHENTICATION(HttpStatus.BAD_REQUEST, "인증 정보가 없습니다."),
    NOT_EXIST_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "존재하지 않는 리프레시 토큰입니다."),
    BLANK_TOKEN_HEADER(HttpStatus.BAD_REQUEST, "헤더에 토큰이 없습니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 토큰입니다."),
    NO_AUTHORITY(HttpStatus.BAD_REQUEST, "해당 요청에 대한 권한이 없습니다."),
    NO_PERFUME(HttpStatus.BAD_REQUEST, "향수가 없습니다."),


    FILE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAIL(HttpStatus.BAD_REQUEST, "파일 삭제에 실패했습니다."),
    NOT_VALID_EXTENSION(HttpStatus.BAD_REQUEST, "유효하지 않은 확장자입니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}