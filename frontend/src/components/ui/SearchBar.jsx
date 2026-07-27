export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative max-w-xl w-full">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-sm">🔍</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10"
      />
    </div>
  );
}