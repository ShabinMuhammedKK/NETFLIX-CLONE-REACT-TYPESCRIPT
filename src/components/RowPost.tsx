import React, { useEffect, useState } from 'react'
import './RowPost.css'
import { IMAGE_URL} from '../constants/constants';
import axios from 'axios';
import YouTube from 'react-youtube';
import { API_KEY } from '../constants/constants';

interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: number[];
  id?: number;
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  title?: string;
  isSmall?: boolean;
  url:string;
  key?: string;
}

const RowPost: React.FC <Movie> = ({ title, isSmall,url}) => {
  const [posts, setPosts] = useState<Movie[]>([]);
  const [urlID,setUrlID] = useState<Movie | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        if (isMounted) {
          const data: Movie[] = response.data.results;
          setPosts(data);
         
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay:1,
    },
  };
  const handleMovie = (id: number): void => {
    console.log(id);
  
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlID(response.data.results[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching movie videos:', error.message);
      });
  };;

  return (
    
    <div className='row'>
      <h2>{title}</h2>
      <div className='posters'>
        {posts.map((obj) => (
          <img 
          onClick={()=>{
            handleMovie(obj.id!)
          }}
          key={obj.id} className={isSmall? 'smallPoster' : 'poster'} src={`${IMAGE_URL+obj.backdrop_path}`} alt="cate-posters" />
        ))}
      </div>
      {urlID && <YouTube videoId={urlID.key} opts={opts}/>}
      
    </div>
  );
};

export default RowPost;