import { useEffect, useState } from "react"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home/Home"
import axios from "axios"
import './App.css'
import YouTube from "react-youtube"
import { useDispatch, useSelector } from "react-redux"
import { getAllMovies, getMovie, selectAllMovies, selectMovie, selectMoviesStatus } from "./app/slices/movies/movieSlice"

function App() {

  const dispatch = useDispatch()
  const state = useSelector(state => state.movies)
  const moviesList = useSelector(selectAllMovies)
  const moviesStatus = useSelector(selectMoviesStatus)
  const movieState = useSelector(selectMovie)

  const IMAGE_PATH = `https://image.tmdb.org/t/p/original/`
  const URL_IMAGE = `https://image.tmdb.org/t/p/original/`

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [trailer, setTrailer] = useState(null)
  const [movie, setMovie] = useState({ title: 'Loading movie...' })
  const [playing, setPlaying] = useState(false)

  const searchMovies = (e) => {
    e.preventDefault()
    getAllMovies(searchKey)
  }

  useEffect(() => {
    if (moviesStatus === 'idle') {
      dispatch(getAllMovies())
    } if (moviesStatus === 'succeed') {
      setMovies(moviesList.list.results)
      setMovie(moviesList.list.results[0])
    }
  }, [dispatch, moviesList])

  useEffect(() => {
    if (movieState.status === 'idle') {
      setMovie({})
    } if (movieState.status === 'succeed') {
      console.log(movieState.data);

      setMovie(movieState.data)
    }
  }, [dispatch, movieState])

  const getMovieLocal = async (movie) => {
    setMovie(movie)
    window.scrollTo(0, 0)

    if (movie.video && movie.video.results) {
      const trailer = movie.video.results.find((vid) => vid.name === 'Official Trailer')
      setTrailer(trailer ? trailer : movie.video.results[0])
    }

  }

  return (
    <>
      <h2 className="text-center mt-5 mb-5">Trailer movies</h2>
      <form className="container mb-4" onSubmit={searchMovies}>
        <input type="text" placeholder="Search" onChange={(e) => setSearchKey(e.target.value)} />
        <button className="btn btn-primary">Search</button>
      </form>

      {/* Banner */}

      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      <div className="container mt-3">
        <div className="row">
          {
            movies.map((item, index) => {
              return (
                <div className="col-md-4 mb-3" key={index} onClick={() => getMovieLocal(item)}>
                  <img src={`${URL_IMAGE}${item.poster_path}`} alt="" height={600} width="100%" />
                  <h4 className="text-center">{item.title}</h4>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
