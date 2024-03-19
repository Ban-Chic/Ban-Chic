package com.ssafy.banchic.repository;

import com.ssafy.banchic.domain.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
