export interface User {
	id: number;
	email: string;
	password: string;
	refreshToken?: string | null;
}

export interface UserRegisterRequest {
	email: string;
	password: string;
}

export interface UserLoginRequest {
	email: string;
	password: string;
}

export interface AuthenticatedRequest {
	user: User;
}
export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}
