package com.korit.running_back_s2.security.handler;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Value("${app.web-host}")
    private String webHost;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();
        String redirectUrl;

        User foundUser = userMapper.findByEmail(user.getEmail());
        if (foundUser == null) {
            String email = URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);
            String oauthType = URLEncoder.encode(user.getOauthType(), StandardCharsets.UTF_8);
            String img = URLEncoder.encode(user.getPicture(), StandardCharsets.UTF_8);
            String providerId = URLEncoder.encode(user.getProviderId(), StandardCharsets.UTF_8);
            String birthDate = URLEncoder.encode(String.valueOf(user.getBirthDate()), StandardCharsets.UTF_8);
            redirectUrl = String
                    .format("%s/auth/oauth2/signup?email=%s&providerId=%s&oauthType=%s&img=%s&birthDate=%s"
                            ,webHost, email, providerId, oauthType, img, birthDate);
        } else {
            String accessToken = jwtUtil.generateAccessToken(foundUser);
            redirectUrl = String.format("%s/auth/oauth2/signin?accessToken=%s",webHost ,accessToken);
        }

        response.sendRedirect(redirectUrl);
    }
}