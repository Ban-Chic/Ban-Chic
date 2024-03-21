package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.response.perfume.PerfumeRes;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.PerfumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfumeService {

    private final PerfumeRepository perfumeRepository;

    public PerfumeRes getPerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new CustomException(ErrorCode.NON_FOUND_ID));

        return PerfumeRes.from(perfume);
    }

}
