package com.ssafy.banchic.domain.entity.perfume;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "season_id")
    private Long id;

    private int spring;
    private int summer;
    private int fall;
    private int winter;
    private int day;
    private int night;

}
