import { logoutUser } from '../store/userManager';
import { API_CONFIG } from './config';
import { httpClient } from './httpClient';

class ApiService {
    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.token = null;
        this.httpClient = httpClient;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = null;
    }

    handleUnauthorized() {
        console.log('Session expired - logging out user');
        this.clearToken();
        logoutUser(this);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const headers = {
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await this.httpClient.request(url, config);

            if (response.status === 401) {
                this.handleUnauthorized();
            }

            if (!response.ok) {
                const errorMessage = response.data?.message || `HTTP Error ${response.status}`;
                console.error('API Request Error:', errorMessage);
            }

            return response.data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    async login(email) {
        try {
            const response = await this.request(API_CONFIG.ENDPOINTS.LOGIN, {
                method: 'POST',
                body: { sub: API_CONFIG.REFRESH_KEY },
            });

            if (response.token) {
                this.setToken(response.token);
            }

            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async refreshToken(email) {
        try {
            const response = await this.login(email);
            return response;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    }

    async getCarouselData() {
        try {
            const response = await this.request(API_CONFIG.ENDPOINTS.CAROUSEL, {
                method: 'GET',
            });

            return response;
        } catch (error) {
            console.error('Get carousel data error:', error);
            throw error;
        }
    }
}

export const apiService = new ApiService();

