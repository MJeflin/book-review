
import { useState, useEffect } from "react";
import BookCard from "@/components/BookCard";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { categories, books } from "@/data/mockData";
import { Book } from "@/types";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [sortBy, setSortBy] = useState<"rating" | "title">("rating");

  useEffect(() => {
    let result = selectedCategory 
      ? books.filter(book => book.category === selectedCategory)
      : books;
    
    if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.avgRating - a.avgRating);
    } else if (sortBy === "title") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredBooks(result);
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name} Books` 
              : "All Books"}
          </h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Button 
              variant={sortBy === "rating" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortBy("rating")}
            >
              Top Rated
            </Button>
            <Button 
              variant={sortBy === "title" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortBy("title")}
            >
              Title
            </Button>
          </div>
        </div>
        
        {/* Mobile Category Filter */}
        <div className="md:hidden mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
          
          {filteredBooks.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No books found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
