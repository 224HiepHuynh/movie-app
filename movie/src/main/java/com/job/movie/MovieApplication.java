package com.job.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.job.movie.config.TmdbConfig;

@SpringBootApplication
public class MovieApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(MovieApplication.class, args);
		
			
	}


}
