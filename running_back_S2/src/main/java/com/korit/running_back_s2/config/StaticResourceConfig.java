package com.korit.running_back_s2.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String base = System.getProperty("user.dir").replace("\\", "/");
        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:" + base + "/upload/")
                .setCachePeriod(3600);
    }
}