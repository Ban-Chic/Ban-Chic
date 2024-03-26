package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.entity.perfume.Gender;
import com.ssafy.banchic.domain.entity.perfume.Longevity;
import com.ssafy.banchic.domain.entity.perfume.Price;
import com.ssafy.banchic.domain.entity.perfume.Season;
import com.ssafy.banchic.domain.entity.perfume.Sillage;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id")
    private Long id;

    @Column(name = "perfume_name")
    private String perfumeName;
    private String perfumeImg;
    private String brandName;
    private String brandImg;
    private String accords;
    private String notes;
    private int year;
    private int bestRate;
    private float rate;

    // 향수 조회수
    @Builder.Default
    private int perfumeCount = 0;
    // 향수 좋아요수
    @Builder.Default
    private int likeCount = 0;

    @OneToOne
    @JoinColumn(name = "sillage_id")
    private Sillage sillage;

    @OneToOne
    @JoinColumn(name = "logevity_id")
    private Longevity longevity;

    @OneToOne
    @JoinColumn(name = "price_id")
    private Price price;

    @OneToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @OneToOne
    @JoinColumn(name = "season_id")
    private Season season;

    // 메서드 정리
    public void increaseLike() {
        this.likeCount++;
    }

    public void decreaseLike() {
        if(this.likeCount > 0)
            this.likeCount--;
    }
}
