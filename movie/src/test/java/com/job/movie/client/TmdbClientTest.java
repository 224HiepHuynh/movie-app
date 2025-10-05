package com.job.movie.client;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.job.movie.config.TmdbConfig;
import com.job.movie.model.response.GenreResponse;
import com.job.movie.model.response.MovieDetailedResponse;
import com.job.movie.model.response.MovieSummaryResponse;
import com.job.movie.model.response.MoviesResponse;

public class TmdbClientTest {

    @Mock
    private TmdbConfig tmdbConfig;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private TmdbClient tmdbClient;

    public TmdbClientTest() {
        
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetMovieById_success() {
        Integer movieId = 550; // Example movie ID for "Fight Club"
        MovieDetailedResponse mockResponse = MovieDetailedResponse.builder()
            .backdropPath("backdropPath")
            .id(550)
            .title("Fight Club")
            .overview("An insomniac office worker...")
            .genres(List.of(new GenreResponse(18, "Drama")))
            .releaseDate("1999-10-15")
            .voteAverge(8.433)
            .build();

        when(tmdbConfig.getTMDB_API_KEY()).thenReturn("fake_api_key");
        when(tmdbConfig.getTMDB_BASE_URL()).thenReturn("https://api.themoviedb.org/3");
        when(restTemplate.getForEntity(
            "https://api.themoviedb.org/3/movie/550?api_key=fake_api_key",
            MovieDetailedResponse.class
        )).thenReturn(
            ResponseEntity.ok(mockResponse)
        );
        MovieDetailedResponse result=tmdbClient.getMovieById(movieId);
        assertSame(mockResponse, result);
    }

    @Test
    public void testGetMovieById_failure() {
        Integer movieId = 999999; // Non-existent movie ID

        when(tmdbConfig.getTMDB_API_KEY()).thenReturn("fake_api_key");
        when(tmdbConfig.getTMDB_BASE_URL()).thenReturn("https://api.themoviedb.org/3");
        when(restTemplate.getForEntity(
            "https://api.themoviedb.org/3/movie/999999?api_key=fake_api_key",
            MovieDetailedResponse.class
        )).thenReturn(
            ResponseEntity.status(404).body(null)
        );

        try {
            tmdbClient.getMovieById(movieId);
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            assertEquals("Failed to fetch movie by id  from TMDB404 NOT_FOUND", e.getMessage());
        }
    }

    @Test
    public void getTrendingMoviesByTimeFrame_day_success() {
        String timeFrame = "day";
        MovieDetailedResponse movie1 = MovieDetailedResponse.builder()
            .backdropPath("backdropPath1")
            .id(1)
            .title("Movie 1")
            .overview("Overview 1")
            .genres(List.of(new GenreResponse(18, "Drama")))
            .releaseDate("2023-01-01")
            .voteAverge(7.5)
            .build();

        MovieDetailedResponse movie2 = MovieDetailedResponse.builder()
            .backdropPath("backdropPath2")
            .id(2)
            .title("Movie 2")
            .overview("Overview 2")
            .genres(List.of(new GenreResponse(28, "Action")))
            .releaseDate("2023-02-01")
            .voteAverge(8.0)
            .build();

        MoviesResponse mockMoviesResponse = MoviesResponse.builder()
            .results(List.of(
                MovieSummaryResponse.builder()
                    .id(movie1.getId())
                    .title(movie1.getTitle())
                    .overview(movie1.getOverview())
                    .build(),
                MovieSummaryResponse.builder()
                    .id(movie2.getId())
                    .title(movie2.getTitle())
                    .overview(movie2.getOverview())
                    .build()
            ))
            .build();

        when(tmdbConfig.getTMDB_API_KEY()).thenReturn("fake_api_key");
        when(tmdbConfig.getTMDB_BASE_URL()).thenReturn("https://api.themoviedb.org/3");
        when(restTemplate.getForEntity(
            "https://api.themoviedb.org/3/trending/movie/day?api_key=fake_api_key",
            MoviesResponse.class
        )).thenReturn(
            ResponseEntity.ok(mockMoviesResponse)
        );

        List<MovieSummaryResponse> result = tmdbClient.getTrendingMoviesByTimeFrame(timeFrame);
        assertEquals(2, result.size());
        assertEquals("Movie 1", result.get(0).getTitle());
        assertEquals("Movie 2", result.get(1).getTitle());
    }
    
}