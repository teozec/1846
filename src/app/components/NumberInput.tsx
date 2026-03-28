import { useEffect, useState } from "react";

type NumberInputProps = {
    id?: string;
    value: number;
    onChange?: (value: number) => void;
};

export function NumberInput({ id, value, onChange = () => { } }: NumberInputProps) {
    const [raw, setRaw] = useState(String(value));

    useEffect(() => { setRaw(String(value)); }, [value]);

    return (
        <input
            id={id}
            type="number"
            value={raw}
            onChange={(e) => {
                setRaw(e.target.value);
                const parsed = Number(e.target.value);
                if (!isNaN(parsed)) onChange(parsed);
            }}
        />
    );
}