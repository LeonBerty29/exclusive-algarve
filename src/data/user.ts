import { notFound } from "next/navigation";

// Types for user-related API responses
export interface User {
  id: number;
  reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  newsletter?: boolean;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  newsletter?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  client: User;
}

export interface LoginResponse {
  client: User;
  token: string;
}

export interface ProfileResponse {
  client: User;
}

export interface LogoutResponse {
  message: string;
}

function createBasicAuthHeader(): string {
  const credentials = btoa(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  );
  return `Basic ${credentials}`;
}

function createBearerAuthHeader(token: string): string {
  return `Bearer ${token}`;
}

/**
 * Generic fetch wrapper with Basic Auth or Bearer Auth
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  useBearer = false,
  token?: string
): Promise<T> {
  const url = `${process.env.API_BASE_URL}${endpoint}`;

  const authHeader =
    useBearer && token
      ? createBearerAuthHeader(token)
      : createBasicAuthHeader();

  const defaultHeaders = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  // Helper function to get error status from Response
  const getErrorStatus = (error: unknown): number | undefined => {
    if (error instanceof Error && error.cause instanceof Response) {
      return error.cause.status;
    }
    return undefined;
  };

  try {
    const response: Response = await fetch(url, config);

    // Check for 404 specifically
    if (response.status === 404) {
      console.log(response.status);
      throw new Error(`API Error: ${response.status} ${response.statusText}`, {
        cause: response,
      });
    }

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`,
        {
          cause: response,
          
        }
      );
    }

    return response.json();
  } catch (error: unknown) {
    const errorStatus = getErrorStatus(error);

    // console.log({ errorStatus });

    if (errorStatus === 404) {
      notFound();
    }

    if (errorStatus === 401) {
      throw error;
    }

    // console.error(error);
    // Re-throw the error with proper typing
    // if (error instanceof Error) {
    //   throw error;
    // } else {
    //   throw new Error(`Failed to fetch from API: ${String(error)}`);
    // }

    throw error;
  }
}

// User API functions
export const registerUser = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  const endpoint = `/user/register`;

  try {
    return apiRequest<RegisterResponse>(endpoint, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const endpoint = `/user/login`;

  return apiRequest<LoginResponse>(endpoint, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const getUserProfile = async (
  token: string
): Promise<ProfileResponse> => {
  const endpoint = `/user/me`;

  return apiRequest<ProfileResponse>(
    endpoint,
    {
      method: "GET",
    },
    true,
    token
  );
};

export const logoutUser = async (token: string): Promise<LogoutResponse> => {
  const endpoint = `/user/logout`;

  return apiRequest<LogoutResponse>(
    endpoint,
    {
      method: "POST",
    },
    true,
    token
  );
};

// Client-side API functions (for use in components)
export const clientApi = {
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return response.json();
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  },
};
