package com.ssafy.banchic.domain.entity.perfume;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Sillage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sillage_id")
    private Long id;

    private int veryWeak;
    private int weak;
    private int moderate;
    private int longLasting;
    private int eternal;

}
