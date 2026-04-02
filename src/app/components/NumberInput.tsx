import { useEffect, useState } from "react";

type NumberInputProps = {
    id?: string;
    value: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
};

export function NumberInput({ id, value, onChange = () => { }, min, max }: NumberInputProps) {
    const [raw, setRaw] = useState(String(value));

    useEffect(() => { setRaw(String(value)); }, [value]);

    return (
        <input
            id={id}
            type="number"
            value={raw}
            min={min}
            max={max}
            onChange={(e) => {
                const input = e.target.value;
                if (input === "" || isNaN(Number(input))) {
                    setRaw(input);
                    return;
                }
                const parsed = Number(input);
                const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, parsed));
                setRaw(String(clamped));
                onChange(clamped);
            }}
            onBlur={(e) => {
                const input = e.target.value;
                if (input === "" || isNaN(Number(input))) {
                    const fallback = Math.max(min ?? 0, 0);
                    setRaw(String(fallback));
                    onChange(fallback);
                }
            }}
        />
    );
}