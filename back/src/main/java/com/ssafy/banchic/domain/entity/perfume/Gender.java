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
public class Gender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gender_id")
    private Long id;

    private int female;
    private int moreFemale;
    private int unisex;
    private int moreMale;
    private int male;

    @Builder
    public Gender(int female, int moreFemale, int unisex, int moreMale, int male) {
        this.female = female;
        this.moreFemale = moreFemale;
        this.unisex = unisex;
        this.moreMale = moreMale;
        this.male = male;
    }
}
