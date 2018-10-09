class EasyHTTP {
    async get(url) {
        const result = await fetch(url);
        return await result.json();
    }

    async post(url, data) {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return await result.json();
    }

    async put(url, data) {
        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await result.json();
    }

    async delete(url) {
        const result = await fetch(url, {
            method: 'DELETE'
        });

        return 'Resouce deleted...';
    }
}

export const http = new EasyHTTP();