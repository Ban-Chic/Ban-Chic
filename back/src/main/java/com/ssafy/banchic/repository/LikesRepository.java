package com.ssafy.banchic.repository;

import com.ssafy.banchic.domain.entity.Likes;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    boolean existsByMemberAndPerfume(Member member, Perfume perfume);
    void deleteByMemberAndPerfume(Member member, Perfume perfume);
}
