"use client";

import { useState, useEffect, useRef } from "react";

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string, placeName?: string) => void;
  placeholder?: string;
  className?: string;
}

interface Suggestion {
  id: string;
  place_name: string;
  text: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Start typing an address...",
  className = "",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  const searchAddress = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // Get Mapbox token from environment (no fallback for security)
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      console.warn("NEXT_PUBLIC_MAPBOX_TOKEN not configured");
      return;
    }

    try {
      // Search near Orlando/Central Florida area
      const proximity = "-81.38,28.54"; // Orlando coordinates
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${token}&` +
        `country=US&` +
        `proximity=${proximity}&` +
        `types=poi,address,place&` +
        `limit=5`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const results = data.features.map((f: { id: string; place_name: string; text: string }) => ({
          id: f.id,
          place_name: f.place_name,
          text: f.text,
        }));
        setSuggestions(results);
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Address search error:", error);
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    // Debounce the search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchAddress(newValue);
    }, 300);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.place_name);
    onChange(suggestion.place_name, suggestion.text);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-[9999] w-full mt-1 bg-gray-900 border border-white/30 rounded-lg shadow-2xl max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseDown={(e) => e.preventDefault()}
              className="px-4 py-3 cursor-pointer hover:bg-blue-600/30 border-b border-white/10 last:border-b-0 text-sm text-gray-200 hover:text-white transition-colors"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
