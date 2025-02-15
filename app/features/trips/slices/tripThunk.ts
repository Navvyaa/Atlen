import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostTripRequest, PostTripResponse, GetTripsResponse } from '../types';

import * as tripApi from '../api/tripApi';


// postTrip Thunk
export const postTrip = createAsyncThunk<PostTripResponse, PostTripRequest>(
    'trip/postTrip',
    async (data, { rejectWithValue }) => {
        try {
            const response = await tripApi.postTripAPI(data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// getTrips Thunk
export const getTrips = createAsyncThunk<GetTripsResponse, void>(
    'trip/getTrips',
    async (_, { rejectWithValue }) => {
        try {
            const response = await tripApi.getTripsAPI();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);