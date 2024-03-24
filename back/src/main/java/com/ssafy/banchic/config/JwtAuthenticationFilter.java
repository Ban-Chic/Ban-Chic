package com.ssafy.banchic.config;

import com.ssafy.banchic.util.JwtTokenProvider;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class JwtAuthenticationFilter implements Filter {

    private final JwtTokenProvider jwtTokenProvider;
    private final static String main = "/";
    private final static List<String> whiteList = new ArrayList<>();

    static {
        whiteList.add("/api/swagger-ui");
        whiteList.add("/api/swagger-ui/index.html");
        whiteList.add("/api/swagger-ui.html");
        whiteList.add("/api/auth/login/*");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String requestURI = request.getRequestURI();

        if(requestURI.equals(main) || checkWhiteList(requestURI)) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        try {
            String accessToken = resolveToken(request);
            Long memberId = null;
            // 비회원일 경우
            if(accessToken == null) {
                HttpServletResponse httpResponse = (HttpServletResponse) servletResponse;
                httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                return;
            }
            else if(accessToken != null && jwtTokenProvider.validToken(accessToken)) {
                memberId = jwtTokenProvider.getMemberIdFromToken(accessToken);
                request.setAttribute("memberId", memberId);
                filterChain.doFilter(servletRequest, servletResponse);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    private boolean checkWhiteList(String requestURI) {
        for (String white : whiteList) {
            if (requestURI.startsWith(white) || pathMatches(requestURI, white)) {
                return true;
            }
        }
        return false;
    }

    private boolean pathMatches(String requestURI, String pattern) {
        if (pattern.endsWith("/*")) {
            String patternPrefix = pattern.substring(0, pattern.length() - 2);
            return requestURI.startsWith(patternPrefix);
        }
        return false;
    }
}
