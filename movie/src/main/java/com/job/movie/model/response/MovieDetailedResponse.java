package com.job.movie.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDetailedResponse {
    
    @JsonProperty("backdrop_path")
    private String backdropPath;

    private Integer id;
    private String title;
    private String overview;
    private List<GenreResponse> genres;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("vote_average")
    private Double voteAverge;
  


}
