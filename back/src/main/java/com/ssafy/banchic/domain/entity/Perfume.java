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
    private Integer perfumeCount = 0;
    // 향수 좋아요수
    @Builder.Default
    private Integer likeCount = 0;

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

//    @Builder
//    public Perfume(String perfumeName, String perfumeImg, String brandName, String brandImg, String accords, String notes, int year, int bestRate, float rate, Integer perfumeCount, Integer likeCount, Sillage sillage, Longevity longevity, Price price, Gender gender, Season season) {
//        this.perfumeName = perfumeName;
//        this.perfumeImg = perfumeImg;
//        this.brandName = brandName;
//        this.brandImg = brandImg;
//        this.accords = accords;
//        this.notes = notes;
//        this.year = year;
//        this.bestRate = bestRate;
//        this.rate = rate;
//        this.perfumeCount = perfumeCount;
//        this.likeCount = likeCount;
//        this.sillage = sillage;
//        this.longevity = longevity;
//        this.price = price;
//        this.gender = gender;
//        this.season = season;
//    }

    // 메서드 정리
    public void increaseLike() {
        this.likeCount++;
    }

    public void decreaseLike() {
        this.likeCount--;
    }
}
