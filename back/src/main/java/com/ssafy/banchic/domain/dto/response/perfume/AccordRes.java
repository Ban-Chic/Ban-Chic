package com.ssafy.banchic.domain.dto.response.perfume;

import com.ssafy.banchic.domain.entity.Accord;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AccordRes {

    private float citrus;
    private float floral;
    private float freshSpicy;
    private float powdery;
    private float sweet;
    private float aromatic;

    public static AccordRes from(Accord accord) {
        return AccordRes.builder()
            .citrus(accord.getCitrus())
            .floral(accord.getFloral())
            .freshSpicy(accord.getFreshSpicy())
            .powdery(accord.getPowdery())
            .sweet(accord.getSweet())
            .build();
    }

}
