package com.korit.running_back_s2.config;

import com.korit.running_back_s2.security.filter.JwtFilter;
import com.korit.running_back_s2.security.handler.OAuth2SuccessHandler;
import com.korit.running_back_s2.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;
    private final JwtFilter jwtFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, OAuth2SuccessHandler oAuth2SuccessHandler) throws Exception {
        http.cors(Customizer.withDefaults());
        http.csrf(csrf -> csrf.disable());
        http.formLogin(formLogin -> formLogin.disable());
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Filter Setting
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/image/**", "/uploads/**", "/oauth2/**").permitAll();
            auth.requestMatchers("/api/**").permitAll();
            auth.requestMatchers("/api/regions/**").permitAll();
            auth.requestMatchers("/api/users/**").permitAll();
            auth.requestMatchers("/api/mypage/**").permitAll();
            auth.requestMatchers("/api/image/**").permitAll();
            auth.requestMatchers("/api/crews/**").permitAll();
            auth.requestMatchers("/api/reports/**").permitAll();
            auth.requestMatchers("/api/members/**").permitAll();
            auth.requestMatchers("/api/welcomes/**").permitAll();
            auth.requestMatchers("/api/freeBoards/**").permitAll();
            auth.requestMatchers("/api/marathons/**").permitAll();



            auth.anyRequest().authenticated();
        });

        http.exceptionHandling(handling ->
                handling.authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                        }
                )
        );

        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                .successHandler(oAuth2SuccessHandler)
                .failureHandler((request, response, exception) -> {
                    System.out.println("oauth2 인증 실패");
                    exception.printStackTrace();
                    response.sendRedirect("/?error=oauth2");
                })
        );

        return http.build();
    }
}