import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, fallback: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
        } catch {
            return fallback;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
