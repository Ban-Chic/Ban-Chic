package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.request.PersuitReq;
import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.domain.dto.response.MemberNicknameRes;
import com.ssafy.banchic.domain.dto.response.PerfumeOverviewRes;
import com.ssafy.banchic.domain.dto.response.ReviewRes;
import com.ssafy.banchic.domain.entity.Heart;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.Perfume;
import com.ssafy.banchic.domain.entity.Persuit;
import com.ssafy.banchic.domain.entity.Recommend;
import com.ssafy.banchic.domain.entity.Review;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.HeartRepository;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.repository.PerfumeRepository;
import com.ssafy.banchic.repository.PersuitRepository;
import com.ssafy.banchic.repository.RecommendRepository;
import com.ssafy.banchic.repository.PerfumeReviewRepository;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
@Transactional
public class MemberService {

    private final FileUploadService fileUploadService;

    private final MemberRepository memberRepository;
    private final PerfumeRepository perfumeRepository;
    private final PersuitRepository persuitRepository;
    private final RecommendRepository recommendRepository;
    private final PerfumeReviewRepository perfumeReviewRepository;
    private final HeartRepository heartRepository;

    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;

    public List<ReviewRes> getMemberReview(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ID);
        }

        List<Review> findMemberReviews = perfumeReviewRepository.findByMemberId(memberId);

        return findMemberReviews
                .stream()
                .map(ReviewRes::from)
                .toList();
    }

    public List<PerfumeOverviewRes> getMemberHeart(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if(!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ID);
        }

        List<Heart> memberHearts = heartRepository.findByMemberId(memberId);

        return memberHearts.stream()
                .map(e -> PerfumeOverviewRes.from(e.getPerfume()))
                .toList();
    }

    public MemberInfoRes getMemberInfo(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        return MemberInfoRes.from(memberFromAccessToken);
    }

    public void delete(Long memberId, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        memberRepository.deleteById(memberId);
    }

    public MemberNicknameRes updateNickname(Long memberId, UpdateNicknameReq updateNicknameReq, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ID);
        }

        memberFromAccessToken.updateNickname(updateNicknameReq.getNickname());
        Member updateMember = memberRepository.save(memberFromAccessToken);

        return MemberNicknameRes.from(updateMember);
    }

    public String updateImage(Long memberId, MultipartFile file, HttpServletRequest httpServletRequest) {
        Member memberFromAccessToken = getMemberFromAccessToken(httpServletRequest);

        if (!memberFromAccessToken.getId().equals(memberId)) {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

        if (!(memberFromAccessToken.getImage() == null || memberFromAccessToken.getImage().isEmpty())) {
            fileUploadService.delete(memberFromAccessToken.getImage());
        }

        String imgUrl = fileUploadService.save("member/", file);
        memberFromAccessToken.updateImage(imgUrl);

        memberRepository.save(memberFromAccessToken);

        return imgUrl;
    }

    public List<PerfumeOverviewRes> survey(PersuitReq req, HttpServletRequest httpServletRequest) {
        Member member = getMemberFromAccessToken(httpServletRequest);

        String url = "http://j10b109.p.ssafy.io:9876/api/recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        StringBuilder sb = new StringBuilder();
        String requestBody = sb.append("{")
            .append("\"clear\": " ).append(req.getClear() ? 1 : 0).append(", ")
            .append("\"romantic\": " ).append(req.getRomantic() ? 1 : 0).append(", ")
            .append("\"pretty\": " ).append(req.getPretty() ? 1 : 0).append(", ")
            .append("\"coolcasual\": " ).append(req.getCoolcasual() ? 1 : 0).append(", ")
            .append("\"casual\": " ).append(req.getCasual() ? 1 : 0).append(", ")
            .append("\"natural\": " ).append(req.getNatural() ? 1 : 0).append(", ")
            .append("\"elegant\": " ).append(req.getElegant() ? 1 : 0).append(", ")
            .append("\"dynamic\": " ).append(req.getDynamic() ? 1 : 0).append(", ")
            .append("\"wild\": " ).append(req.getWild() ? 1 : 0).append(", ")
            .append("\"gorgeous\": " ).append(req.getGorgeous() ? 1 : 0).append(", ")
            .append("\"chic\": " ).append(req.getChic() ? 1 : 0).append(", ")
            .append("\"modern\": " ).append(req.getModern() ? 1 : 0).append(", ")
            .append("\"classic\": " ).append(req.getClassic() ? 1 : 0).append(", ")
            .append("\"dandy\": " ).append(req.getDandy() ? 1 : 0)
            .append("}").toString();

        Persuit persuit = Persuit.from(req, member);
        if (persuitRepository.existsByMember(member)) {
            persuitRepository.deleteByMember(member);
            persuitRepository.flush();
        }
        persuitRepository.save(persuit);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        Recommendation recommResponse = restTemplate.postForObject(url, requestEntity, Recommendation.class);

        Recommend recommend = new Recommend();
        recommend.setMember(member);
        recommend.setOne(recommResponse.getRecommendIndex().get(0));
        recommend.setTwo(recommResponse.getRecommendIndex().get(1));
        recommend.setThree(recommResponse.getRecommendIndex().get(2));
        recommend.setFour(recommResponse.getRecommendIndex().get(3));
        recommend.setFive(recommResponse.getRecommendIndex().get(4));
        recommend.setSix(recommResponse.getRecommendIndex().get(5));
        recommend.setSeven(recommResponse.getRecommendIndex().get(6));
        recommend.setEight(recommResponse.getRecommendIndex().get(7));
        recommend.setNine(recommResponse.getRecommendIndex().get(8));
        recommend.setTen(recommResponse.getRecommendIndex().get(9));

        if (recommendRepository.existsByMember(member)) {
            recommendRepository.deleteByMember(member);
            recommendRepository.flush();
        }
        recommendRepository.save(recommend);

        List<PerfumeOverviewRes> recommList = new ArrayList<>();
        recommList.add(findById(recommend.getOne()));
        recommList.add(findById(recommend.getTwo()));
        recommList.add(findById(recommend.getThree()));
        recommList.add(findById(recommend.getFour()));
        recommList.add(findById(recommend.getFive()));
        recommList.add(findById(recommend.getSix()));
        recommList.add(findById(recommend.getSeven()));
        recommList.add(findById(recommend.getEight()));
        recommList.add(findById(recommend.getNine()));
        recommList.add(findById(recommend.getTen()));

        return recommList;
    }

    @Getter
    public static class Recommendation {
        private List<Integer> recommend_index;

        public List<Integer> getRecommendIndex() {
            return recommend_index;
        }
    }

    public List<PerfumeOverviewRes> getRecommList(HttpServletRequest request) {
        Member member = getMemberFromAccessToken(request);

        Recommend recommend = recommendRepository.findByMember(member)
            .orElseThrow(() -> new CustomException(ErrorCode.RECOMM_NOT_EXIST));

        List<PerfumeOverviewRes> recommList = new ArrayList<>();
        recommList.add(findById(recommend.getOne()));
        recommList.add(findById(recommend.getTwo()));
        recommList.add(findById(recommend.getThree()));
        recommList.add(findById(recommend.getFour()));
        recommList.add(findById(recommend.getFive()));
        recommList.add(findById(recommend.getSix()));
        recommList.add(findById(recommend.getSeven()));
        recommList.add(findById(recommend.getEight()));
        recommList.add(findById(recommend.getNine()));
        recommList.add(findById(recommend.getTen()));

        return recommList;
    }

    private PerfumeOverviewRes findById(int id) {
        Optional<Perfume> perfume = perfumeRepository.findById(id);
        return perfume.isPresent() ? PerfumeOverviewRes.from(perfume.get()) : null;
    }


    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
    }

}
