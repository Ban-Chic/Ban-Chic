package com.ssafy.banchic.repository;

import com.ssafy.banchic.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
