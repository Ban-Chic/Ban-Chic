package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.entity.perfume.Gender;
import com.ssafy.banchic.domain.entity.perfume.Longevity;
import com.ssafy.banchic.domain.entity.perfume.Price;
import com.ssafy.banchic.domain.entity.perfume.Season;
import com.ssafy.banchic.domain.entity.perfume.Sillage;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
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
    private String notes;
    private int year;
    private int bestRate;
    private float rate;

    @OneToOne
    @JoinColumn(name = "accord_id")
    private Accord accord;

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

}
