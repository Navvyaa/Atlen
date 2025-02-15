// Request Types
export interface PostTripLocation {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
}

export type TripStatus = 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';


export interface PostTripRequest {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    location: PostTripLocation;
    status: TripStatus;
}

// Response Types
export interface TripUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface TripLocation {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    point_latitude: number;
    point_longitude: number;
}

export interface PostTripResponse {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    creator: TripUser;
    location: TripLocation;
    companions: TripUser[];
    status: TripStatus;
    created_at: string;
    updated_at: string;
}

export interface TripCreator {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
}

export interface TripSummary {
    id: string;               // UUID format, readonly
    title: string;           // max length 255
    start_date: string;      // date format
    end_date: string;        // date format
    location: string;        // readonly
    status: TripStatus;
    creator: TripCreator;
    companion_count: number; // readonly
}

export type GetTripsResponse = TripSummary[];

// Add validation constants
export const TRIP_VALIDATION = {
    TITLE_MAX_LENGTH: 255
} as const;