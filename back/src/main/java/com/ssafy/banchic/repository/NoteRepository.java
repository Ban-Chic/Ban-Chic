package com.ssafy.banchic.repository;

import com.ssafy.banchic.domain.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {

}
