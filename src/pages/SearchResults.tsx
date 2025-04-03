
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import { books } from "@/data/mockData";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";
  
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const results = books.filter(
        book => 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Search Results for "{searchQuery}"
        </h1>
        
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No books found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
