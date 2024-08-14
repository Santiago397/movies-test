import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMovies = createAsyncThunk("movies/getAllMovies", async () => {
  let searchKey = ''

  const type = searchKey ? "search" : "discover"
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${type}/movie`, {
    params: {
      api_key: import.meta.env.VITE_API_KEY,
      query: searchKey
    }
  })

  return data
})

export const getMovie = createAsyncThunk("movies/getMovie", async (id) => {
  
  console.log(id);
  
  
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/movie/${id}`, {
    params: {
      api_key: import.meta.env.VITE_API_KEY,
      append_to_response: "video"
    }
  })
  
  return data
})

const initialState = {
  status: 'idle',
  list: [],
  movie: {
    status: 'idle'
  },
  isError: false
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getAllMovies.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
      state.status = 'succeed';
      state.list = action.payload
    })
    builder.addCase(getAllMovies.rejected, (state, action) => {
      state.status = action.error.message ?? 'error';
    })
    builder.addCase(getMovie.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.movie.status = 'succeed';
      state.movie.data = action.payload
    })
    builder.addCase(getMovie.rejected, (state, action) => {
      state.movie.status = action.error.message ?? 'error';
    })
  }
})



export default movieSlice.reducer

export const selectAllMovies = (state = initialState) => state.movies
export const selectMoviesStatus = (state = initialState) => state.movies.status
export const selectMovie = (state = initialState) => state.movies.movie
