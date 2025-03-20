
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Basic Fullstack App
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
