package com.job.movie.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieDetailedResponse {
    
    
    private Integer id;
    private String title;
    private String overview;
    private List<GenreResponse> genres;
    private Integer runtime;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("vote_average")
    private Double voteAverge;
  


}
