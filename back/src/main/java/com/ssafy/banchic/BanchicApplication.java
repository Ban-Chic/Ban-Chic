package com.ssafy.banchic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BanchicApplication {

    public static void main(String[] args) {
        SpringApplication.run(BanchicApplication.class, args);
    }

}
