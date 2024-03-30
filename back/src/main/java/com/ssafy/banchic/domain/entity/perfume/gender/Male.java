package com.ssafy.banchic.domain.entity.perfume.gender;

import com.ssafy.banchic.domain.entity.BaseEntity;
import com.ssafy.banchic.domain.entity.perfume.Gender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Male extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "male_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Builder
    public static Male createMale(Gender gender) {
        return Male.builder()
                .gender(gender)
                .build();
    }
}
