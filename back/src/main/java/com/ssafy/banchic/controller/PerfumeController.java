package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.service.PerfumeReviewService;
import com.ssafy.banchic.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/perfumes")
public class PerfumeController {

    private final PerfumeService perfumeService;
    private final PerfumeReviewService perfumeReviewService;


    @GetMapping("/{perfumeId}")
    public ResponseEntity<CommonResponse> getPerfume(@PathVariable Long perfumeId) {
        return ResponseEntity.ok(CommonResponse.builder()
                .data(perfumeService.getPerfume(perfumeId))
                .build());
    }

    @GetMapping("/{perfumeId}/reviews")
    public ResponseEntity<CommonResponse> getReviews(
        @PathVariable Long perfumeId,
        @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {
        return ResponseEntity.ok(CommonResponse.builder()
            .data(perfumeReviewService.getList(perfumeId, pageable))
            .build());
    }

}
