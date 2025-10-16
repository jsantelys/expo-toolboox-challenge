import { expoFetchClient } from './clients/expoFetchClient';

class HttpClient {
    constructor(client) {
        this.client = client;
    }
    async get(url, config = {}) {
        return this.client.request(url, {
            ...config,
            method: 'GET',
        });
    }
    async post(url, data, config = {}) {
        return this.client.request(url, {
            ...config,
            method: 'POST',
            body: data,
        });
    }
    async put(url, data, config = {}) {
        return this.client.request(url, {
            ...config,
            method: 'PUT',
            body: data,
        });
    }
    async patch(url, data, config = {}) {
        return this.client.request(url, {
            ...config,
            method: 'PATCH',
            body: data,
        });
    }
    async delete(url, config = {}) {
        return this.client.request(url, {
            ...config,
            method: 'DELETE',
        });
    }
    async request(url, config = {}) {
        return this.client.request(url, config);
    }
    setDefaultHeader(key, value) {
        this.client.setDefaultHeader(key, value);
    }
    removeDefaultHeader(key) {
        this.client.removeDefaultHeader(key);
    }
    getDefaultHeaders() {
        return this.client.getDefaultHeaders();
    }
}

export const httpClient = new HttpClient(expoFetchClient);

export { HttpClient };

