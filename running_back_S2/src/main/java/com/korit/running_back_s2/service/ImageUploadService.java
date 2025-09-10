package com.korit.running_back_s2.service;


import com.korit.running_back_s2.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageUploadService {
    private final AppProperties appProperties;
    private final FileService fileService;

    public String upload(String imageConfigName, MultipartFile file) {
        String fileName = fileService.uploadFile(file, imageConfigName);
        return appProperties.getImageConfigs().get(imageConfigName).getPrefix() + "/" + fileName;
    }

}