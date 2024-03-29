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
public class Spring extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "spring_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "season_id")
    private Season season;

    @Builder
    public Spring(Season season) {
        this.season = season;
    }
}
