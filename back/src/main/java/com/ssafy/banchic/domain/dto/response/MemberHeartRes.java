package com.ssafy.banchic.domain.dto.response;

import com.ssafy.banchic.domain.entity.Perfume;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberHeartRes {

    private Long id;
    private String perfumeName;
    private String perfumeImg;

    private static MemberHeartRes from(Perfume perfume) {
        return MemberHeartRes.builder()
                .id(perfume.getId())
                .perfumeName(perfume.getPerfumeName())
                .perfumeImg(perfume.getPerfumeImg())
                .build();
    }

}
