package com.ssafy.banchic.exception;

import com.ssafy.banchic.domain.dto.response.CommonResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler({
        CustomException.class
    })
    public ResponseEntity<CommonResponse> customRequestException
        (final CustomException e) {
        log.warn("api Exception : {}", e.getErrorCode());
        return ResponseEntity.badRequest().body(
            CommonResponse.builder()
            .status(e.getErrorCode().getHttpStatus())            .data(e.getMessage())
            .build());
    }

    @Getter
    @ToString
    @AllArgsConstructor
    public static class ExceptionResponse {
        private String message;
        private ErrorCode errorCode;
    }

}
