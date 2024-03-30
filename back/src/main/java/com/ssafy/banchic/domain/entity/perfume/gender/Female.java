package com.ssafy.banchic.domain.entity.perfume.gender;

import com.ssafy.banchic.domain.entity.BaseEntity;
import com.ssafy.banchic.domain.entity.perfume.Gender;
import com.ssafy.banchic.domain.entity.perfume.Season;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Female extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "female_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Builder
    public static Female createFemale(Gender gender) {
        return Female.builder()
                .gender(gender)
                .build();
    }
}
