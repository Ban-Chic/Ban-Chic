package com.ssafy.banchic.repository;

import com.ssafy.banchic.domain.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Heart, Long> {

}
