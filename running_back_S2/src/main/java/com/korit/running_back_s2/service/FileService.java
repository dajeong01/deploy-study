package com.korit.running_back_s2.service;

import com.korit.running_back_s2.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AppProperties appProperties;

    public String uploadFile(MultipartFile file, String imageConfigName) {
        String dirPath = appProperties.getImageConfigs().get(imageConfigName).getDirPath();

        if (file == null || file.isEmpty()) {
            System.out.println("파일이 null이거나 비어 있습니다.");
            return null;
        }
        String newFilename = generateRandomFilename(file.getOriginalFilename());
        mkdirs(dirPath);
        Path path = Paths.get(dirPath, newFilename);
        System.out.println(path);
        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return newFilename;
    }

    private String generateRandomFilename(String originalFilename) {
        StringBuilder newFilename = new StringBuilder();
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        newFilename.append("_");
        newFilename.append(originalFilename);

        return newFilename.toString();
    }

    private void mkdirs(String path) {
        File f = new File(path);
        if (!f.exists()) {
            f.mkdirs();
        }
    }

    public boolean deleteFile(String imageConfigName, String oldFileName) {
        if (oldFileName == null || oldFileName.isBlank()) {
            return true;
        }

        if (oldFileName.startsWith("http://") || oldFileName.startsWith("https://")) {
            return true;
        }

        String dirPath = appProperties.getImageConfigs().get(imageConfigName).getDirPath();

        File file = new File(dirPath + "/" + oldFileName);
        if (!file.exists()) {
            return false;
        }
        return file.delete();
    }
}