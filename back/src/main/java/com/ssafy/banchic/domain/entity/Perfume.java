package com.ssafy.banchic.domain.entity;

import com.ssafy.banchic.domain.entity.perfume.Gender;
import com.ssafy.banchic.domain.entity.perfume.Longevity;
import com.ssafy.banchic.domain.entity.perfume.Price;
import com.ssafy.banchic.domain.entity.perfume.Sillage;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import java.util.List;
import lombok.Getter;

@Entity
@Getter
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "perfume_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToMany
    @JoinTable(name = "perfume_note",
        joinColumns = @JoinColumn(name = "perfume_id"),
        inverseJoinColumns = @JoinColumn(name = "note_id"))
    private List<Note> notes;

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

    @Column(name = "perfume_name")
    private String name;
    private int year;
    private String imgUrl;

}
