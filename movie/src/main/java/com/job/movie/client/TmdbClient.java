package com.job.movie.client;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.job.movie.config.TmdbConfig;
import com.job.movie.model.response.MovieSummaryResponse;
import com.job.movie.model.response.MoviesResponse;
import com.job.movie.model.response.MovieDetailedResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TmdbClient {

    private final TmdbConfig tmdbConfig;
    private final RestTemplate restTemplate;

    public List<MovieSummaryResponse> getTrendingMoviesByTimeFrame(String timeFrame) {

        String url= String.format("%s/trending/movie/%s?api_key=%s",
                tmdbConfig.getTMDB_BASE_URL(),
                timeFrame,
                tmdbConfig.getTMDB_API_KEY()
                );
        ResponseEntity<MoviesResponse> response = restTemplate.getForEntity(url, MoviesResponse.class);

        if(response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response.getBody().getResults();
        }
        else{
            throw new RuntimeException("Failed to fetch trending movies from TMDB" + response.getStatusCode());
        }

    }


    public MovieDetailedResponse getMovieById(Integer id) {

        String url= String.format("%s/movie/%s?api_key=%s",
                tmdbConfig.getTMDB_BASE_URL(),
                id,
                tmdbConfig.getTMDB_API_KEY()
                );

        ResponseEntity<MovieDetailedResponse> response = restTemplate.getForEntity(url, MovieDetailedResponse.class);

         if(response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response.getBody();
        }
        else{
            throw new RuntimeException("Failed to fetch movie by id  from TMDB" + response.getStatusCode());
        }

    }


}
