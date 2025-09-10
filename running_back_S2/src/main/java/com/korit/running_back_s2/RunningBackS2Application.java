package com.korit.running_back_s2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class RunningBackS2Application {

    public static void main(String[] args) {
        SpringApplication.run(RunningBackS2Application.class, args);
    }

}
