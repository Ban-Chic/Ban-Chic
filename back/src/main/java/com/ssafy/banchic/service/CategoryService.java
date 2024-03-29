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

    public List<SeasonRes> getSeasonList(String seasonName) {
        List<Perfume> findPerfumes = new ArrayList<>();
        if (seasonName.equals("Spring")) {
            List<Spring> springData = springRepository.findAll();
            for (Spring spring : springData) {
                Perfume perfume = perfumeRepository.findById(spring.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Summer")) {
            List<Summer> summerData = summerRepository.findAll();
            for (Summer summer : summerData) {
                Perfume perfume = perfumeRepository.findById(summer.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Fall")) {
            List<Fall> fallData = fallRepository.findAll();
            for (Fall fall : fallData) {
                Perfume perfume = perfumeRepository.findById(fall.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Winter")) {
            List<Winter> winterData = winterRepository.findAll();
            for (Winter winter : winterData) {
                Perfume perfume = perfumeRepository.findById(winter.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Day")) {
            List<Day> dayData = dayRepository.findAll();
            for (Day day : dayData) {
                Perfume perfume = perfumeRepository.findById(day.getSeason().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Night")) {
            List<Night> nightData = nightRepository.findAll();
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
