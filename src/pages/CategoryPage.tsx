
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import { books, categories } from "@/data/mockData";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryBooks, setCategoryBooks] = useState<Book[]>([]);
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(() => {
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      setCategoryName(category?.name || "");
      
      const filteredBooks = books.filter(book => book.category === categoryId);
      setCategoryBooks(filteredBooks);
    }
  }, [categoryId]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {categoryName} Books
        </h1>
        
        {categoryBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No books found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
