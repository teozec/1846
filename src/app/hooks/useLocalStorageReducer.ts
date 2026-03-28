import { useEffect, useReducer } from 'react';

export function useLocalStorageReducer<S, A>(key: string, reducer: (state: S, action: A) => S, fallback: S) {
    const [state, dispatch] = useReducer(reducer, undefined, () => {
        try {
            return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
        } catch {
            return fallback;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, dispatch] as const;
}