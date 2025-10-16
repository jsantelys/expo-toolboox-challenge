import { fetch } from 'expo/fetch';

class ExpoFetchClient {
    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    async request(url, config = {}) {
        const headers = {
            ...this.defaultHeaders,
            ...config.headers,
        };

        const requestConfig = {
            ...config,
            headers,
        };

        if (requestConfig.body && typeof requestConfig.body === 'object') {
            requestConfig.body = JSON.stringify(requestConfig.body);
        }

        try {
            const response = await fetch(url, requestConfig);

            return {
                data: await this.parseResponse(response),
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                ok: response.ok,
            };
        } catch (error) {
            throw {
                message: error.message,
                code: 'NETWORK_ERROR',
                originalError: error,
            };
        }
    }

    async parseResponse(response) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            try {
                return await response.json();
            } catch (error) {
                return null;
            }
        }

        return await response.text();
    }

    setDefaultHeader(key, value) {
        this.defaultHeaders[key] = value;
    }

    removeDefaultHeader(key) {
        delete this.defaultHeaders[key];
    }

    getDefaultHeaders() {
        return { ...this.defaultHeaders };
    }
}

export const expoFetchClient = new ExpoFetchClient();

