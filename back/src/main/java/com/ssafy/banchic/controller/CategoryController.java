package com.ssafy.banchic.controller;

import com.ssafy.banchic.domain.dto.response.CommonResponse;
import com.ssafy.banchic.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/season/{seasonName}")
    public ResponseEntity<CommonResponse> season(@PathVariable("seasonName") String seasonName) {

        return ResponseEntity.ok(CommonResponse.builder()
                .message("season에 대한 분류 값 뽑기")
                .data(categoryService.getSeasonList(seasonName))
                .build());
    }
}
