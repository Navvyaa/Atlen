export interface checkEmailRequest {
    email: string;
}
export interface checkEmailResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
        is_registered: boolean;
        is_verified: boolean;
    }
}

export interface loginRequest {
    email: string | null;
    password: string;
}

export interface loginResponse {
    success: boolean;
    message: string;
    data: {
        access: string;
        refresh: string;
        email: string;
        is_verified: boolean;
        is_registered: boolean;
    }
}
export interface registerRequest {
    email: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
}

export interface registerResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
        is_verified: boolean;
        is_registered: boolean;
    }
}

export interface verifyOtpRequest {
    email: string;
    otp: string;
    verification_type: string;
}

export interface verifyOtpResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
        reset_token?: string;
        access?: string;
        is_verified?: boolean;
        is_registered?: boolean;
        refresh?: string;

    }
}

export interface forgotPasswordRequest {
    email: string;
}
export interface forgotPasswordResponse {
    success: boolean;
    message: string;
    data: {
        email: string;
    }
}

export interface resetPasswordRequest {
    email: string;
    new_password: string;
    confirm_password: string;
    reset_token: string;
}

export interface resetPasswordResponse {
    success: boolean;
    message: string;
}

export interface refreshTokenRequest {
    refresh_token: string;
}

export interface refreshTokenResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
    }
}
export interface googleOAuthResponse {
    success: boolean;
    message: string;
    data: {
        access_token: string;
        expires_in: number;
        token_type: string;
        scope: string;
        refresh_token: string;
        user: {
            email: string;
            first_name: string;
            last_name: string;
        }
    }
}

