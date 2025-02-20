import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postTrip, getTrips } from './tripThunk';
import { TripSummary, PostTripResponse } from '../types';

interface TripState {
  trips: TripSummary[];
  currentTrip: PostTripResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    clearCurrentTrip: (state) => {
      state.currentTrip = null;
    },
    clearTripError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Trip
      .addCase(postTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTrip.fulfilled, (state, action: PayloadAction<PostTripResponse>) => {
        state.loading = false;
        state.currentTrip = action.payload;
        state.trips.push({
          id: action.payload.id,
          title: action.payload.title,
          start_date: action.payload.start_date,
          end_date: action.payload.end_date,
          location: action.payload.location.name,
          status: action.payload.status,
          creator: action.payload.creator,
          companion_count: action.payload.companions.length
        });
      })
      .addCase(postTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create trip';
      })

      // Get Trips
      .addCase(getTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action: PayloadAction<TripSummary[]>) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trips';
      });
  },
});

export const { clearCurrentTrip, clearTripError } = tripSlice.actions;
export default tripSlice.reducer;