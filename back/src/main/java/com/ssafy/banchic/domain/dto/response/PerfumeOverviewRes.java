package com.ssafy.banchic.domain.dto.response;

import com.ssafy.banchic.domain.entity.Perfume;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PerfumeOverviewRes {

    private Integer id;
    private String perfumeName;
    private String perfumeImg;
    private String brandName;
    private int year;
    private String accords;

    public static PerfumeOverviewRes from(Perfume perfume) {
        return PerfumeOverviewRes.builder()
            .id(perfume.getId())
            .perfumeName(perfume.getPerfumeName())
            .perfumeImg(perfume.getPerfumeImg())
            .brandName(perfume.getBrandName())
            .year(perfume.getYear())
            .accords(perfume.getAccords())
            .build();
    }

}
