package com.job.movie.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Builder;
import lombok.Data;

@Component
@Builder
@Data
public class TmdbConfig {
    
    private final String TMDB_API_KEY;
    private final String TMDB_BASE_URL;
    
    public TmdbConfig(
       @Value("${tmdb.base.url}") String TMDB_BASE_URL,
       @Value("${tmdb.api.key}") String TMDB_API_KEY
    ) {
        this.TMDB_API_KEY = TMDB_API_KEY;
        this.TMDB_BASE_URL = TMDB_BASE_URL;
    }

}
