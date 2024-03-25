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
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "price_id")
    private Long id;

    private int wayOverpriced;
    private int overpriced;
    private int ok;
    private int goodValue;
    private int greatValue;

    @Builder
    public Price(int wayOverpriced, int overpriced, int ok, int goodValue, int greatValue) {
        this.wayOverpriced = wayOverpriced;
        this.overpriced = overpriced;
        this.ok = ok;
        this.goodValue = goodValue;
        this.greatValue = greatValue;
    }
}
