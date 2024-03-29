package com.ssafy.banchic.repository.category.season;

import com.ssafy.banchic.domain.entity.perfume.Season;
import com.ssafy.banchic.domain.entity.perfume.season.Day;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Long> {

}
