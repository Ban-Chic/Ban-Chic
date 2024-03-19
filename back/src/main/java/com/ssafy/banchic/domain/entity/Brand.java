package com.ssafy.banchic.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long id;

    @OneToMany(mappedBy = "brand")
    private List<Perfume> perfumes;

    @Column(name = "brand_name")
    private String name;

}
