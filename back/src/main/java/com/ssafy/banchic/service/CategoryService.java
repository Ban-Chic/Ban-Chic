package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.response.GenderRes;
import com.ssafy.banchic.domain.dto.response.SeasonRes;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.domain.entity.perfume.gender.*;
import com.ssafy.banchic.domain.entity.perfume.season.*;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.PerfumeRepository;
import com.ssafy.banchic.repository.category.gender.*;
import com.ssafy.banchic.repository.category.season.*;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Tag(name = "Category" , description = "Category API ")
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final PerfumeRepository perfumeRepository;
    private final SpringRepository springRepository;
    private final SummerRepository summerRepository;
    private final FallRepository fallRepository;
    private final WinterRepository winterRepository;
    private final DayRepository dayRepository;
    private final NightRepository nightRepository;

    private final FemaleRepository femaleRepository;
    private final MaleRepository maleRepository;
    private final MoreFemaleRepository moreFemaleRepository;
    private final MoreMaleRepository moreMaleRepository;
    private final UnisexRepository unisexRepository;

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

    public List<GenderRes> getGenderList(String genderName, Pageable pageable) {
        List<Perfume> findPerfumes = new ArrayList<>();
        if(genderName.equals("Male")) {
            Page<Male> males = maleRepository.findAll(pageable);
            for(Male male : males) {
                Perfume perfume = perfumeRepository.findById(male.getGender().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("Female")) {
            Page<Female> females = femaleRepository.findAll(pageable);
            for(Female female : females) {
                Perfume perfume = perfumeRepository.findById(female.getGender().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("MoreMale")) {
            Page<MoreMale> moreMales = moreMaleRepository.findAll(pageable);
            for(MoreMale moreMale : moreMales) {
                Perfume perfume = perfumeRepository.findById(moreMale.getGender().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("MoreFemale")) {
            Page<MoreFemale> moreFemales = moreFemaleRepository.findAll(pageable);
            for(MoreFemale moreFemale : moreFemales) {
                Perfume perfume = perfumeRepository.findById(moreFemale.getGender().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("Unisex")) {
            Page<Unisex> unisexes = unisexRepository.findAll(pageable);
            for(Unisex unisex : unisexes) {
                Perfume perfume = perfumeRepository.findById(unisex.getGender().getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        }

        return findPerfumes.stream()
                .map(GenderRes::from)
                .toList();
    }
}
