"use client";

import { useState } from "react";
import { Search } from "lucide-react";

// interface SearchBarProps {
//   onSearch: (query: string) => void
//   placeholder?: string
// }

export function SearchBarComponent() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSearch(query)
  };

  return (
    <div className="flex justify-center items-center mx-[5%] md:mx-auto md:w-full py-6">
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Which model?"
          className="w-full py-2 pl-4 pr-10 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-2 mr-3 text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
