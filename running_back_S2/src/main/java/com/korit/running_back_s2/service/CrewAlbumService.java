package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.dto.image.CrewAlbumImageDto;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class CrewAlbumService {

    private final CrewMapper crewMapper;
    private final ImageUrlUtil imageUrlUtil; // ✅ 주입

    private static final Pattern IMG_SRC_PATTERN = Pattern.compile(
            "<img[^>]*\\s+src=[\"']?([^\"'>\\s]+)[\"']?[^>]*>",
            Pattern.CASE_INSENSITIVE
    );

    public List<CrewAlbumImageDto> getCrewAlbumImages(int crewId) {
        var rows = crewMapper.findContentsByCrewId(crewId);
        List<CrewAlbumImageDto> out = new ArrayList<>();

        for (var row : rows) {
            String html = row.getContent();
            if (html == null || html.isBlank()) continue;

            Matcher m = IMG_SRC_PATTERN.matcher(html);
            while (m.find()) {
                String src = m.group(1);
                if (src == null || src.isBlank()) continue;

                // ✅ 절대 URL 생성
                String absolute = imageUrlUtil.buildImageUrl(src, "crewFreeBoard");
                out.add(new CrewAlbumImageDto(row.getFreeId(), absolute, row.getCreatedAt()));
            }
        }
        return out;
    }

    /** 상대경로면 서버 도메인 붙여서 절대경로로 보정 (환경에 맞게 수정) */
    private String normalizeUrl(String src) {
        String lower = src.toLowerCase(Locale.ROOT);
        if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("data:")) {
            return src; // 이미 절대경로 or data URL
        }
        if (src.startsWith("/")) {
            return "http://localhost:8080" + src;
        }
        return "http://localhost:8080/" + src;
    }
    public List<String> extractImageUrls(String content) {
        List<String> urls = new ArrayList<>();
        if (content == null || content.isBlank()) return urls;
        Matcher m = IMG_SRC_PATTERN.matcher(content);
        while (m.find()) urls.add(m.group(1));
        return urls;
    }
}
