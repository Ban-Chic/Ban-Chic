package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.response.ReviewRes;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.domain.entity.Review;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.PerfumeRepository;
import com.ssafy.banchic.repository.PerfumeReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfumeReviewService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeReviewRepository perfumeReviewRepository;

    public Page<ReviewRes> getList(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
        Page<Review> reviews = perfumeReviewRepository.getReviewsByPerfume(perfume);

        return null;
    }

}
