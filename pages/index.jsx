
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/items`, newItem);
      setItems([...items, response.data]);
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Basic Fullstack App</title>
        <meta name="description" content="A basic fullstack application with Next.js and Express" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Basic Fullstack App</h1>
        
        <div className="max-w-2xl mx-auto">
          <ItemForm onAddItem={addItem} />
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading items...</p>
            </div>
          ) : (
            <ItemList items={items} onDeleteItem={deleteItem} />
          )}
        </div>
      </main>

      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Basic Fullstack App</p>
        </div>
      </footer>
    </div>
  );
}
