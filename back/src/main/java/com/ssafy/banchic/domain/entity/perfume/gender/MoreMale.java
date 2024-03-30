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
public class MoreMale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moreMale_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Builder
    public static MoreMale createMoreMale(Gender gender) {
        return MoreMale.builder()
                .gender(gender)
                .build();
    }
}
