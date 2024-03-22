package com.ssafy.banchic.domain.dto.response.perfume;

import com.ssafy.banchic.domain.entity.perfume.Sillage;
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

    private int veryWeak;
    private int weak;
    private int moderate;
    private int longLasting;
    private int eternal;

    public static AccordRes from(Sillage sillage) {
        return AccordRes.builder()
            .veryWeak(sillage.getVeryWeak())
            .weak(sillage.getWeak())
            .moderate(sillage.getModerate())
            .longLasting(sillage.getLongLasting())
            .eternal(sillage.getLongLasting())
            .build();
    }

}
