package com.job.movie.config;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class TmdbConfig {
    
    private final String TMDB_API_KEY;
    private final String TMDB_BASE_URL;


}
