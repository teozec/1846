type NumberInputProps = {
    id?: string;
    value: number;
    onChange?: (value: number) => void;
};

export function NumberInput({ value, onChange = () => {} }: NumberInputProps) {
    return (
        <input
            id="id"
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
        />
    )
}