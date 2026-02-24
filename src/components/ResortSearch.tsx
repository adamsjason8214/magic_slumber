"use client";

import { useState, useEffect, useRef } from "react";
import { searchResorts, Resort } from "@/lib/resorts";

interface ResortSearchProps {
  value: string;
  onChange: (name: string) => void;
  onSelect: (resort: { name: string; address: string }) => void;
  placeholder?: string;
  className?: string;
}

export default function ResortSearch({
  value,
  onChange,
  onSelect,
  placeholder = "Start typing resort name...",
  className = "",
}: ResortSearchProps) {
  const [suggestions, setSuggestions] = useState<Resort[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    const results = searchResorts(newValue);
    setSuggestions(results);
    setIsOpen(results.length > 0);
  };

  const handleSuggestionClick = (resort: Resort) => {
    setInputValue(resort.name);
    onSelect({ name: resort.name, address: resort.address });
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          const results = searchResorts(inputValue);
          if (results.length > 0) {
            setSuggestions(results);
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-[9999] w-full mt-1 bg-gray-900 border border-white/30 rounded-lg shadow-2xl max-h-60 overflow-auto">
          {suggestions.map((resort, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(resort)}
              onMouseDown={(e) => e.preventDefault()}
              className="px-4 py-3 cursor-pointer hover:bg-blue-600/30 border-b border-white/10 last:border-b-0 transition-colors"
            >
              <div className="text-sm text-gray-200 hover:text-white font-medium">{resort.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{resort.address}</div>
            </li>
          ))}
          <li className="px-4 py-2 text-xs text-gray-600 border-t border-white/10">
            Don&apos;t see your resort? Just type the name manually.
          </li>
        </ul>
      )}
    </div>
  );
}
