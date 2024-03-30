package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.response.SeasonRes;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.domain.entity.perfume.season.*;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.PerfumeRepository;
import com.ssafy.banchic.repository.category.season.*;
import com.ssafy.banchic.repository.perfume.GenderRepository;
import com.ssafy.banchic.repository.perfume.SeasonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final GenderRepository genderRepository;
    private final SeasonRepository seasonRepository;
    private final PerfumeRepository perfumeRepository;
    private final SpringRepository springRepository;
    private final SummerRepository summerRepository;
    private final FallRepository fallRepository;
    private final WinterRepository winterRepository;
    private final DayRepository dayRepository;
    private final NightRepository nightRepository;

    public List<SeasonRes> getSeasonList(String seasonName, Pageable pageable) {
        List<Perfume> findPerfumes = new ArrayList<>();
        if (seasonName.equals("Spring")) {
            Page<Spring> springData = springRepository.findAll(pageable);
            for (Spring spring : springData) {
                Perfume perfume = perfumeRepository.findById(spring.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Summer")) {
            Page<Summer> summerData = summerRepository.findAll(pageable);
            for (Summer summer : summerData) {
                Perfume perfume = perfumeRepository.findById(summer.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Fall")) {
            Page<Fall> fallData = fallRepository.findAll(pageable);
            for (Fall fall : fallData) {
                Perfume perfume = perfumeRepository.findById(fall.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Winter")) {
            Page<Winter> winterData = winterRepository.findAll(pageable);
            for (Winter winter : winterData) {
                Perfume perfume = perfumeRepository.findById(winter.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Day")) {
            Page<Day> dayData = dayRepository.findAll(pageable);
            for (Day day : dayData) {
                Perfume perfume = perfumeRepository.findById(day.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Night")) {
            Page<Night> nightData = nightRepository.findAll(pageable);
            for (Night night : nightData) {
                Perfume perfume = perfumeRepository.findById(night.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        }

        return findPerfumes.stream()
                .map(SeasonRes::from)
                .toList();

        /**
         *
         */
    }
}
