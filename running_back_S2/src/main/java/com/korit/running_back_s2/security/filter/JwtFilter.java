package com.korit.running_back_s2.security.filter;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.util.AppProperties;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final AppProperties appProperties;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // OPTIONS 요청은 그대로 통과
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String path = request.getRequestURI();
        if (path.startsWith("/image/") || path.startsWith("/uploads/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorization = request.getHeader("Authorization");
        authenticate(authorization);

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void authenticate(String token) {
        String validatedToken = jwtUtil.validateBearerToken(token);
        if (validatedToken == null) {
            return;
        }

        Claims claims = jwtUtil.getClaims(validatedToken);
        if (claims == null) {
            return;
        }

        setAuthentication(claims);
    }

    private void setAuthentication(Claims claims) {
        Integer userId = (Integer) claims.get("userId");
        User foundUser = userMapper.findById(userId);
        if (foundUser == null) {
            return;
        }

        // picture가 null일 수 있으므로 기본값 설정
        String picture = foundUser.getPicture() != null ? foundUser.getPicture() : "";

        // picture가 http로 시작하지 않으면 prefix 추가
        if (!picture.startsWith("http")) {
            String prefix = appProperties.getImageConfigs().get("profile").getPrefix();
            String newProfileImg = prefix + "/" + picture;
            foundUser.setPicture(newProfileImg);
        } else {
            foundUser.setPicture(picture); // http로 시작하면 그대로 사용
        }

        // PrincipalUser 생성
        PrincipalUser principalUser = PrincipalUser.builder()
                .user(foundUser)
                .build();

        // Spring Security Context에 인증 정보 설정
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principalUser, "", principalUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}