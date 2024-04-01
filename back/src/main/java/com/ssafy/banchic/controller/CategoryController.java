package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.request.BrandReq;
import com.ssafy.banchic.domain.dto.request.GenderReq;
import com.ssafy.banchic.domain.dto.request.SeasonReq;
import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.domain.dto.response.GenderRes;
import com.ssafy.banchic.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Category", description = "Category 관련 API")
@RestController
@RequestMapping("/perfumes")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(
            summary = "season 이름 별 페이지 조회",
            description = "season에 들어온 이름에 맞게 값을 페이지로 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "season 정보에 맞게 페이지 목록이 정상적으로 조회되었습니다."
    )
    @GetMapping("/season")
    public ResponseEntity<CommonResponse> season(@RequestBody SeasonReq seasonReq,
                                                 @PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC, size = 20)
                                                 Pageable pageable) {
        String seasonName = seasonReq.getSeasonName();
        return ResponseEntity.ok(CommonResponse.builder()
                .message("season에 대한 분류 값 뽑기")
                .data(categoryService.getSeasonList(seasonName, pageable))
                .build());
    }

    @Operation(
            summary = "gender 이름 별 페이지 조회",
            description = "gender에 들어온 이름에 맞게 값을 페이지로 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "gender 정보에 맞게 페이지 목록이 정상적으로 조회되었습니다."
    )
    @GetMapping("/gender")
    public ResponseEntity<CommonResponse> gender(@RequestBody GenderReq genderReq,
                                                 @PageableDefault(sort = "createdAt", direction = Sort.Direction.ASC, size = 20)
                                                 Pageable pageable) {
        String genderName = genderReq.getGenderName();
        log.info("genderName : {}", genderName);
        return ResponseEntity.ok(CommonResponse.builder()
                .message("gender에 대한 분류 값 뽑기")
                .data(categoryService.getGenderList(genderName, pageable))
                .build());
    }

    @GetMapping("/brand")
    public ResponseEntity<CommonResponse> brand(@RequestBody BrandReq brandReq,
                                                @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 20)
                                                Pageable pageable) {
        String brandName = brandReq.getBrandName();
        log.info("brandName : {}", brandName);
        return ResponseEntity.ok(CommonResponse.builder()
                .message("brand에 대한 분류 값 뽑기")
                .data(categoryService.getBrandList(brandName, pageable))
                .build());
    }


}
