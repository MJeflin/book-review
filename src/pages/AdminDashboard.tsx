
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { books as initialBooks, categories } from "@/data/mockData";
import { Book } from "@/types";
import { Pencil, Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const [newBook, setNewBook] = useState<Omit<Book, "id" | "avgRating">>({
    title: "",
    author: "",
    category: "",
    description: "",
    coverImage: ""
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

    const book: Book = {
      ...newBook,
      id: `book${Date.now()}`,
      avgRating: 0
    };

    setBooks([...books, book]);
    setNewBook({
      title: "",
      author: "",
      category: "",
      description: "",
      coverImage: ""
    });
    setIsAddingBook(false);

    toast({
      title: "Success",
      description: "Book added successfully!",
    });
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

    setBooks(books.map(book => book.id === editingBook.id ? editingBook : book));
    setEditingBook(null);

    toast({
      title: "Success",
      description: "Book updated successfully!",
    });
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
    
    toast({
      title: "Success",
      description: "Book deleted successfully!",
    });
  };

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
                      <img src={book.coverImage} alt={book.title} className="h-12 w-9 object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find(c => c.id === book.category)?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.avgRating.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setEditingBook(book)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteBook(book.id)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                  {categories.map(category => (
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
            <Button onClick={handleAddBook}>Add Book</Button>
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

export default AdminDashboard;
