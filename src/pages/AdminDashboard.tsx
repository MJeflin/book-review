
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book } from "@/types";
import { Pencil, Trash, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
}

const AdminDashboard = () => {
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [newBook, setNewBook] = useState<Omit<Book, "id" | "avgRating">>({
    title: "",
    author: "",
    category: "",
    description: "",
    coverImage: ""
  });

  // Fetch books from Supabase
  const { data: books = [], isLoading: isBooksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('id, title, author, cover_image, avg_rating, category_id, description')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching books:', error);
        throw new Error(error.message);
      }
      
      // Transform the data to match our Book type
      return data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.cover_image || '',
        avgRating: book.avg_rating || 0,
        category: book.category_id || '',
        description: book.description || ''
      }));
    }
  });

  // Fetch categories from Supabase
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
      
      if (error) {
        console.error('Error fetching categories:', error);
        throw new Error(error.message);
      }
      
      return data;
    }
  });

  // Add book mutation
  const addBookMutation = useMutation({
    mutationFn: async (bookData: Omit<Book, "id" | "avgRating">) => {
      const { data, error } = await supabase
        .from('books')
        .insert({
          title: bookData.title,
          author: bookData.author,
          category_id: bookData.category,
          description: bookData.description,
          cover_image: bookData.coverImage
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding book:', error);
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book added successfully!",
      });
      setIsAddingBook(false);
      setNewBook({
        title: "",
        author: "",
        category: "",
        description: "",
        coverImage: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add book: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Update book mutation
  const updateBookMutation = useMutation({
    mutationFn: async (book: Book) => {
      const { data, error } = await supabase
        .from('books')
        .update({
          title: book.title,
          author: book.author,
          category_id: book.category,
          description: book.description,
          cover_image: book.coverImage
        })
        .eq('id', book.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating book:', error);
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book updated successfully!",
      });
      setEditingBook(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update book: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting book:', error);
        throw new Error(error.message);
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast({
        title: "Success",
        description: "Book deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete book: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addBookMutation.mutate(newBook);
  };

  const handleUpdateBook = () => {
    if (!editingBook || !editingBook.title || !editingBook.author || !editingBook.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    updateBookMutation.mutate(editingBook);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBookMutation.mutate(id);
    }
  };

  if (isBooksLoading || isCategoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[70vh]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-book-primary" />
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <Button onClick={() => setIsAddingBook(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New Book
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map(book => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover" />
                      ) : (
                        <div className="h-12 w-9 bg-gray-200 flex items-center justify-center text-xs text-gray-500">No Image</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(c => c.id === book.category)?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.avgRating.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingBook(book)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteBook(book.id)}
                          disabled={deleteBookMutation.isPending}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No books found. Add your first book!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={isAddingBook} onOpenChange={setIsAddingBook}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newBook.title} 
                onChange={(e) => setNewBook({...newBook, title: e.target.value})} 
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                value={newBook.author} 
                onChange={(e) => setNewBook({...newBook, author: e.target.value})} 
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newBook.category} 
                onValueChange={(value) => setNewBook({...newBook, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newBook.description} 
                onChange={(e) => setNewBook({...newBook, description: e.target.value})} 
              />
            </div>
            <div>
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input 
                id="coverImage" 
                value={newBook.coverImage} 
                onChange={(e) => setNewBook({...newBook, coverImage: e.target.value})} 
              />
            </div>
            <Button 
              onClick={handleAddBook}
              disabled={addBookMutation.isPending}
            >
              {addBookMutation.isPending ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Book Dialog */}
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
                    {categories.map((category: Category) => (
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
              <Button 
                onClick={handleUpdateBook}
                disabled={updateBookMutation.isPending}
              >
                {updateBookMutation.isPending ? "Updating..." : "Update Book"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
