package com.ssafy.banchic.domain.dto.response;

import com.ssafy.banchic.domain.entity.Perfume;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PerfumeOverviewRes {

    private Long id;
    private String perfumeName;
    private String perfumeImg;

    public static PerfumeOverviewRes from(Perfume perfume) {
        return PerfumeOverviewRes.builder()
                .id(perfume.getId())
                .perfumeName(perfume.getPerfumeName())
                .perfumeImg(perfume.getPerfumeImg())
                .build();
    }

}
