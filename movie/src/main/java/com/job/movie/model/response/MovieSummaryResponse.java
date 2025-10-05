package com.job.movie.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieSummaryResponse {
    
    private Integer id;
    private String title;
    // private String overview;
    
    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("poster_path")
    private String posterPath;
    
}
