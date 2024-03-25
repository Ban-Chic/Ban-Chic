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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PerfumeReviewService {

    private final PerfumeRepository perfumeRepository;
    private final PerfumeReviewRepository perfumeReviewRepository;

    @Transactional(readOnly = true)
    public Page<ReviewRes> getList(Long perfumeId, Pageable pageable) {
        Perfume perfume = perfumeRepository.findById(perfumeId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
        Page<Review> reviews = perfumeReviewRepository.getReviewsByPerfume(perfume, pageable);
        return reviews.map(ReviewRes::from);
    }

}
