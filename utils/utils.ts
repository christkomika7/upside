export function formatPath(pathname: string, locales = ['en', 'fr']): string {
    const parts = pathname.split('/').filter(Boolean); // enlève les slashes vides
    if (locales.includes(parts[0])) {
        parts.shift(); // enlève la locale
    }
    return '/' + parts.join('/');
}


export function getLanguage(pathname: string): string {
    const en = pathname.search("en");
    if (en !== -1) { return "en" }
    else return "fr";
}

export function parseBooleanQuery(value: string | null | undefined): boolean | undefined {
    return value === 'true' ? true : undefined;
}

export function handleBigIntSerialization(data: any): any {
    if (data === null || data === undefined) {
        return data;
    }

    if (typeof data === 'bigint') {
        return Number(data);
    }

    if (Array.isArray(data)) {
        return data.map(item => handleBigIntSerialization(item));
    }

    if (typeof data === 'object') {
        const result: Record<string, any> = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                result[key] = handleBigIntSerialization(data[key]);
            }
        }
        return result;
    }

    return data;
}
