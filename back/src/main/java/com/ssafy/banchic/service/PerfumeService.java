package com.ssafy.banchic.service;

import com.ssafy.banchic.repository.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;

    public void getPerfume(Long perfumeId) {

    }

}
