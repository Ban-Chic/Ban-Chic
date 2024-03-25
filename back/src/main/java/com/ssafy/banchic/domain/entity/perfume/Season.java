package com.ssafy.banchic.domain.entity.perfume;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "season_id")
    private Long id;

    private float spring;
    private float summer;
    private float fall;
    private float winter;
    private float day;
    private float night;

    @Builder
    public Season(float spring, float summer, float fall, float winter, float day, float night) {
        this.spring = spring;
        this.summer = summer;
        this.fall = fall;
        this.winter = winter;
        this.day = day;
        this.night = night;
    }
}
