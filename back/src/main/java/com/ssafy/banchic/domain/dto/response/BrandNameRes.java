package com.ssafy.banchic.domain.dto.response;

import com.ssafy.banchic.domain.entity.Perfume;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BrandNameRes {
    private int perfumeId;
    private String originName;
    private String brand;
    private String accord;
    private String korName;
    private String perfumeImg;

    public static BrandNameRes from(Perfume perfume) {
        return BrandNameRes.builder()
                .perfumeId(perfume.getId())
                .originName(perfume.getPerfumeName())
                .brand(perfume.getBrandName())
                .accord(perfume.getAccords())
                .korName(perfume.getKoreanName())
                .perfumeImg(perfume.getPerfumeImg())
                .build();
    }
}
