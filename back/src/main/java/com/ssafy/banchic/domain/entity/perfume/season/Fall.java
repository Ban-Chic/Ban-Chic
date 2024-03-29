package com.ssafy.banchic.domain.entity.perfume.season;

import com.ssafy.banchic.domain.entity.BaseEntity;
import com.ssafy.banchic.domain.entity.perfume.Season;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Fall extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fall_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @Builder
    public Fall(Season season) {
        this.season = season;
    }
}
