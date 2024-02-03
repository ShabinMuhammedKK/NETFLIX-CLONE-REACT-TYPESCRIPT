import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../axios";
import { API_KEY,IMAGE_URL } from "../constants/constants";

function Banner() {
  const [movie,setMovie] = useState<Movie>()
  interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `trending/all/week?api_key=${API_KEY}&language=en-US`
        );
        
        if (isMounted) {
          const data: Movie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
          setMovie(data)
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="Banner" 
    style={{backgroundImage:`url(${IMAGE_URL+movie?.backdrop_path})`}}>
      <div className="content">
        <h1 className="title">{movie?.title}</h1>
        <div className="banner-buttons">
          <button className="button">Play</button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">
          {movie?.overview}
        </h1>
      </div>
      <div className="fade-bottom"></div>
    </div>
  );
}

export default Banner;
