package com.job.movie.Controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.job.movie.client.TmdbClient;
import com.job.movie.model.response.MovieDetailedResponse;
import com.job.movie.model.response.MovieSummaryResponse;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("tmdb")
@RequiredArgsConstructor
public class TmdbController {
    
    private final TmdbClient tmdbClient;

    @GetMapping("trending/movie")
    public ResponseEntity<List<MovieSummaryResponse>> getTrendingMovies(@RequestParam("time_frame") String timeFrame) {
        List<MovieSummaryResponse> movies =tmdbClient.getTrendingMoviesByTimeFrame(timeFrame);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("trending/movie/{id}")
    public ResponseEntity<MovieDetailedResponse> getMethodName(@PathVariable Integer id) {
        MovieDetailedResponse movie= tmdbClient.getMovieById(id);
        return ResponseEntity.ok(movie);
        
    }
    
    
}
