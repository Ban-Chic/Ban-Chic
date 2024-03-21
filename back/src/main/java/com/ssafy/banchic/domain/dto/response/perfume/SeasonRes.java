package com.ssafy.banchic.domain.dto.response.perfume;

import com.ssafy.banchic.domain.entity.perfume.Season;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SeasonRes {

    private int spring;
    private int summer;
    private int fall;
    private int winter;
    private int day;
    private int night;

    public static SeasonRes from(Season season) {
        return SeasonRes.builder()
            .spring(season.getSpring())
            .summer(season.getSummer())
            .fall(season.getFall())
            .winter(season.getWinter())
            .day(season.getDay())
            .build();
    }

}
