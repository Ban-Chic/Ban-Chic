package com.ssafy.banchic.domain.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PerfumeRes {

    private Long id;
    private String name;
    private String brand;
    private int year;
    private String imgUrl;

}
