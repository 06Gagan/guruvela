export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} Guruvela. All rights reserved.</p>
          <p className="mt-2 text-sm">Your trusted guide for educational decisions</p>
        </div>
      </div>
    </footer>
  )
} 