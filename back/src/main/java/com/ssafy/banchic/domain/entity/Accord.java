package com.ssafy.banchic.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Accord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accord_id")
    private Long id;

    private float citrus;
    private float floral;
    private float freshSpicy;
    private float powdery;
    private float sweet;
    private float aromatic;

}
