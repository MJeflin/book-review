import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import { books as initialBooks, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [categoryBooks, setCategoryBooks] = useState<Book[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();
  const [allBooks, setAllBooks] = useState<Book[]>(initialBooks);
  
  useEffect(() => {
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      setCategoryName(category?.name || "");
      
      const filteredBooks = allBooks.filter(book => book.category === categoryId);
      setCategoryBooks(filteredBooks);
    }
  }, [categoryId, allBooks]);

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = () => {
    if (!editingBook || !editingBook.title || !editingBook.author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedBooks = allBooks.map(book => 
      book.id === editingBook.id ? editingBook : book
    );
    setAllBooks(updatedBooks);
    
    setEditingBook(null);
    
    toast({
      title: "Success",
      description: "Book updated successfully!",
    });
  };

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
              <div key={book.id} className="relative">
                <BookCard book={book} />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditBook(book);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
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

      <Dialog open={!!editingBook} onOpenChange={(open) => !open && setEditingBook(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {editingBook && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingBook.title} 
                  onChange={(e) => setEditingBook({...editingBook, title: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="edit-author">Author</Label>
                <Input 
                  id="edit-author" 
                  value={editingBook.author} 
                  onChange={(e) => setEditingBook({...editingBook, author: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select 
                  value={editingBook.category} 
                  onValueChange={(value) => setEditingBook({...editingBook, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editingBook.description} 
                  onChange={(e) => setEditingBook({...editingBook, description: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="edit-coverImage">Cover Image URL</Label>
                <Input 
                  id="edit-coverImage" 
                  value={editingBook.coverImage} 
                  onChange={(e) => setEditingBook({...editingBook, coverImage: e.target.value})} 
                />
              </div>
              <Button onClick={handleUpdateBook}>Update Book</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryPage;
