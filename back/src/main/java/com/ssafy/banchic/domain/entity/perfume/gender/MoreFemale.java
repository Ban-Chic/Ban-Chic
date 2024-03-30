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
public class MoreFemale extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moreFemale_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @Builder
    public static MoreFemale createMoreFemale(Gender gender) {
        return MoreFemale.builder()
                .gender(gender)
                .build();
    }
}
