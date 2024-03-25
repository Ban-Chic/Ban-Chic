package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.request.ReviewReq;
import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.service.PerfumeReviewService;
import com.ssafy.banchic.service.PerfumeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/perfumes")
public class PerfumeController {

    private final PerfumeService perfumeService;
    private final PerfumeReviewService perfumeReviewService;


    @GetMapping("/{perfumeId}")
    public ResponseEntity<CommonResponse> getPerfume(@PathVariable Long perfumeId) {
        return ResponseEntity.ok(CommonResponse.builder()
                .message("향수 정보 조회")
                .data(perfumeService.getPerfume(perfumeId))
                .build());
    }

    @GetMapping("/{perfumeId}/reviews")
    public ResponseEntity<CommonResponse> getReviews(
        @PathVariable Long perfumeId,
        @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {
        return ResponseEntity.ok(CommonResponse.builder()
            .message("향수에 대한 리뷰 목록 조회")
            .data(perfumeReviewService.getList(perfumeId, pageable))
            .build());
    }

    @PostMapping(value = "/{perfumeId}/reviews")
    public ResponseEntity<CommonResponse> createReview(
        @PathVariable Long perfumeId,
        @RequestPart(value = "form") ReviewReq reviewReq,
        @RequestPart(value = "file", required = false) MultipartFile file,
        HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(CommonResponse.builder()
            .message("향수에 대한 리뷰 작성")
            .data(perfumeReviewService.create(perfumeId, reviewReq, file, httpServletRequest))
            .build());
    }

}
