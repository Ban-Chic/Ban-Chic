package com.ssafy.banchic.domain.dto.response.perfume;

import com.ssafy.banchic.domain.entity.Perfume;
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
    private String perfumeName;
    private String perfumeImg;
    private String brandName;
    private String brandImg;
    private String notes;
    private int year;
    private int bestRate;
    private float rate;

    private AccordRes accord;
    private SillageRes sillage;
    private LongevityRes longevity;
    private PriceRes price;
    private GenderRes gender;
    private SeasonRes season;

    public static PerfumeRes from(Perfume perfume) {
        return PerfumeRes.builder()
            .id(perfume.getId())
            .sillage(SillageRes.from(perfume.getSillage()))
            .longevity(LongevityRes.from(perfume.getLongevity()))
            .price(PriceRes.from(perfume.getPrice()))
            .gender(GenderRes.from(perfume.getGender()))
            .season(SeasonRes.from(perfume.getSeason()))
            .perfumeName(perfume.getPerfumeName())
            .perfumeImg(perfume.getPerfumeImg())
            .brandName(perfume.getBrandName())
            .brandImg(perfume.getBrandImg())
            .notes(perfume.getNotes())
            .year(perfume.getYear())
            .bestRate(perfume.getBestRate())
            .rate(perfume.getRate())
            .build();
    }

}
