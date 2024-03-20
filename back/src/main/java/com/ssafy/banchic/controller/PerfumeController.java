package com.ssafy.banchic.controller;

import com.ssafy.banchic.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/perfumes")
public class PerfumeController {

    private final PerfumeService perfumeService;

}
