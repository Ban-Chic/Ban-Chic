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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//    private static String[] branList = new String[] {"byredo, le labo, aesop, jo malone, bdk, diptyque, tom ford, dior, creed, lanvin"};

    @Transactional(readOnly = true)
    public Page<SeasonRes> getSeasonList(String seasonName, Pageable pageable) {
        List<Perfume> findPerfumes = new ArrayList<>();
        if (seasonName.equals("Spring")) {
            Page<Spring> springData = springRepository.findAll(pageable);
            for (Spring spring : springData) {
                Perfume perfume = perfumeRepository.findById(spring.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Summer")) {
            Page<Summer> summerData = summerRepository.findAll(pageable);
            for (Summer summer : summerData) {
                Perfume perfume = perfumeRepository.findById(summer.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Fall")) {
            Page<Fall> fallData = fallRepository.findAll(pageable);
            for (Fall fall : fallData) {
                Perfume perfume = perfumeRepository.findById(fall.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Winter")) {
            Page<Winter> winterData = winterRepository.findAll(pageable);
            for (Winter winter : winterData) {
                Perfume perfume = perfumeRepository.findById(winter.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Day")) {
            Page<Day> dayData = dayRepository.findAll(pageable);
            for (Day day : dayData) {
                Perfume perfume = perfumeRepository.findById(day.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if (seasonName.equals("Night")) {
            Page<Night> nightData = nightRepository.findAll(pageable);
            for (Night night : nightData) {
                Perfume perfume = perfumeRepository.findById(night.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        }

        List<SeasonRes> seasonResList = findPerfumes.stream()
                .map(SeasonRes::from)
                .toList();

        return new PageImpl<>(seasonResList, pageable, seasonResList.size());
    }

    @Transactional(readOnly = true)
    public Page<GenderRes> getGenderList(String genderName, Pageable pageable) {
        List<Perfume> findPerfumes = new ArrayList<>();
        if(genderName.equals("Male")) {
            Page<Male> males = maleRepository.findAll(pageable);
            for(Male male : males) {
                Perfume perfume = perfumeRepository.findById(male.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("Female")) {
            Page<Female> females = femaleRepository.findAll(pageable);
            for(Female female : females) {
                Perfume perfume = perfumeRepository.findById(female.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("MoreMale")) {
            Page<MoreMale> moreMales = moreMaleRepository.findAll(pageable);
            for(MoreMale moreMale : moreMales) {
                Perfume perfume = perfumeRepository.findById(moreMale.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("MoreFemale")) {
            Page<MoreFemale> moreFemales = moreFemaleRepository.findAll(pageable);
            for(MoreFemale moreFemale : moreFemales) {
                Perfume perfume = perfumeRepository.findById(moreFemale.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        } else if(genderName.equals("Unisex")) {
            Page<Unisex> unisexes = unisexRepository.findAll(pageable);
            for(Unisex unisex : unisexes) {
                Perfume perfume = perfumeRepository.findById(unisex.getPerfume().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_PERFUME));
                findPerfumes.add(perfume);
            }
        }

        List<GenderRes> genderList = findPerfumes.stream()
                .map(GenderRes::from)
                .toList();

        return new PageImpl<>(genderList, pageable, genderList.size());
    }
}
