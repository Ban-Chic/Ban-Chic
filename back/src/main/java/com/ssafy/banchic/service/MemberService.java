package com.ssafy.banchic.service;

import com.ssafy.banchic.domain.dto.request.PersuitReq;
import com.ssafy.banchic.domain.dto.request.UpdateNicknameReq;
import com.ssafy.banchic.domain.dto.response.MemberInfoRes;
import com.ssafy.banchic.domain.dto.response.MemberNicknameRes;
import com.ssafy.banchic.domain.dto.response.RecommRes;
import com.ssafy.banchic.domain.entity.Member;
import com.ssafy.banchic.domain.entity.Persuit;
import com.ssafy.banchic.exception.CustomException;
import com.ssafy.banchic.exception.ErrorCode;
import com.ssafy.banchic.repository.MemberRepository;
import com.ssafy.banchic.repository.PersuitRepository;
import com.ssafy.banchic.util.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.util.List;
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

    private final MemberRepository memberRepository;
    private final PersuitRepository persuitRepository;
    private final FileUploadService fileUploadService;
    private final RestTemplate restTemplate;
    private final TokenProvider tokenProvider;

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

    public RecommRes survey(PersuitReq req, HttpServletRequest httpServletRequest) {
        Member member = getMemberFromAccessToken(httpServletRequest);

        String url = "http://j10b109.p.ssafy.io:9876/api/recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        StringBuilder sb = new StringBuilder();
        String requestBody = sb.append("{")
            .append("\"clear\": " ).append(req.getClear()).append(", ")
            .append("\"romantic\": " ).append(req.getRomantic()).append(", ")
            .append("\"pretty\": " ).append(req.getPretty()).append(", ")
            .append("\"coolcasual\": " ).append(req.getCoolcasual()).append(", ")
            .append("\"casual\": " ).append(req.getCasual()).append(", ")
            .append("\"natural\": " ).append(req.getNatural()).append(", ")
            .append("\"elegant\": " ).append(req.getElegant()).append(", ")
            .append("\"dynamic\": " ).append(req.getDynamic()).append(", ")
            .append("\"wild\": " ).append(req.getWild()).append(", ")
            .append("\"gorgeous\": " ).append(req.getGorgeous()).append(", ")
            .append("\"chic\": " ).append(req.getChic()).append(", ")
            .append("\"modern\": " ).append(req.getModern()).append(", ")
            .append("\"classic\": " ).append(req.getClassic()).append(", ")
            .append("\"dandy\": " ).append(req.getDandy())
            .append("}").toString();

        Persuit persuit = Persuit.from(req, member);
        if (persuitRepository.existsByMember(member)) {
            persuitRepository.deleteByMember(member);
            persuitRepository.flush();
        }
        persuitRepository.save(persuit);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        RecommResponseEntity recommResponseEntity = restTemplate.postForObject(url, requestEntity, RecommResponseEntity.class);

        System.out.println(recommResponseEntity.getRecommendList());

        return null;
    }

    @Getter
    public static class RecommResponseEntity {
        private List<Integer> recommendList;

        public List<Integer> getRecommendList() {
            return recommendList;
        }
    }

    public Member getMemberFromAccessToken(HttpServletRequest request) {
        Member memberFromAccessToken = tokenProvider.getMemberFromAccessToken(request);
        return memberRepository.findById(memberFromAccessToken.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));
    }

}
