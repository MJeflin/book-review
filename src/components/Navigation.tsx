
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, BookOpen, User, Search, LogIn, LogOut } from "lucide-react";
import { categories } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-book-primary" />
              <span className="ml-2 text-xl font-bold text-book-primary">
                BookReviews
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button type="submit" variant="outline" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Button variant="ghost" asChild>
                    <Link to="/admin">Admin</Link>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link to="/profile">
                    <User className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-1" />
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/register">
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden md:flex space-x-4 py-2 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="whitespace-nowrap text-gray-600 hover:text-book-primary"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2">
          <div className="px-4 py-2">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Button type="submit" variant="outline" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="px-4 py-2 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="text-gray-600 hover:text-book-primary mr-4 mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="px-4 py-2 border-t">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" asChild className="w-full justify-start mb-2">
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" asChild className="w-full justify-start mb-2">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleSignOut} className="w-full justify-start">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full justify-start mb-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button variant="default" asChild className="w-full justify-start">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
