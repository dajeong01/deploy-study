package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private static String s(Object o) { return (o == null) ? null : String.valueOf(o); }

    @SuppressWarnings("unchecked")
    private static Map<String, Object> map(Map<String, Object> src, String key) {
        Object v = (src == null) ? null : src.get(key);
        return (v instanceof Map) ? (Map<String, Object>) v : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // google / kakao / naver

        String email = null;
        String img = null;
        String providerId = null;
        LocalDate birthDate = null;

        Map<String, Object> attrs = oAuth2User.getAttributes();

        switch (registrationId) {
            case "google": {
                email = s(attrs.get("email"));
                img = s(attrs.get("picture"));
                providerId = s(attrs.get("sub"));
                break;
            }
            case "kakao": {
                // 구조: { id, kakao_account: { email, birthday(MMdd), birthyear(yyyy), profile: { nickname, profile_image_url, thumbnail_image_url } } }
                Map<String, Object> account = map(attrs, "kakao_account");
                Map<String, Object> profile = map(account, "profile");

                providerId = s(attrs.get("id"));
                email = s(account == null ? null : account.get("email"));

                String birthday = s(account == null ? null : account.get("birthday"));   // MMdd
                String birthyear = s(account == null ? null : account.get("birthyear")); // yyyy

                String profileImage = s(profile == null ? null : profile.get("profile_image_url"));
                String thumbnail = s(profile == null ? null : profile.get("thumbnail_image_url"));
                img = (profileImage != null) ? profileImage :
                        (thumbnail != null ? thumbnail : "/images/default-profile.png");

                if (birthyear != null && birthday != null && birthday.length() == 4) {
                    String mm = birthday.substring(0, 2);
                    String dd = birthday.substring(2, 4);
                    try {
                        birthDate = LocalDate.of(Integer.parseInt(birthyear), Integer.parseInt(mm), Integer.parseInt(dd));
                    } catch (DateTimeException | NumberFormatException ignored) { /* leave null */ }
                }
                break;
            }
            case "naver": {
                // 구조: { response: { id, email, profile_image, birthyear(yyyy), birthday(MM-dd), ... } }
                Map<String, Object> response = map(attrs, "response");

                providerId = s(response == null ? null : response.get("id"));
                email = s(response == null ? null : response.get("email"));
                img = s(response == null ? null : response.get("profile_image"));
                if (img == null) img = "/images/default-profile.png";

                String birthyear = s(response == null ? null : response.get("birthyear")); // yyyy
                String birthday = s(response == null ? null : response.get("birthday"));   // MM-dd
                if (birthyear != null && birthday != null && birthday.contains("-")) {
                    String[] parts = birthday.split("-");
                    if (parts.length == 2) {
                        try {
                            birthDate = LocalDate.of(
                                    Integer.parseInt(birthyear),
                                    Integer.parseInt(parts[0]),
                                    Integer.parseInt(parts[1])
                            );
                        } catch (DateTimeException | NumberFormatException ignored) { /* leave null */ }
                    }
                }
                break;
            }
            default:
                throw new OAuth2AuthenticationException("Unsupported provider: " + registrationId);
        }

        if (providerId == null) {
            throw new OAuth2AuthenticationException("Provider id is null for " + registrationId);
        }

        User user = User.builder()
                .email(email)
                .oauthType(registrationId)
                .picture(img)
                .providerId(providerId)
                .birthDate(birthDate)
                .build();

        return new PrincipalUser(user, attrs != null ? attrs : Collections.emptyMap());
    }
}
