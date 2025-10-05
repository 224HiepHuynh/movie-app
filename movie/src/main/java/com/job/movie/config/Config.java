package com.job.movie.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Config {

    @Bean
    public TmdbConfig TmdbConfig(
       @Value("${tmdb.base.url}") String TMDB_BASE_URL,
       @Value("${tmdb.api.key}") String TMDB_API_KEY
    ) {
        return TmdbConfig.builder()
                .TMDB_API_KEY(TMDB_API_KEY)
                .TMDB_BASE_URL(TMDB_BASE_URL)
                .build();
    }

    @Bean
    public org.springframework.web.client.RestTemplate restTemplate() {
        return new org.springframework.web.client.RestTemplate();
    }

        @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET");
            }
        };
    }
}
