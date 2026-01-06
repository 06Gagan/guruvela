import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MerchandisePage = () => {
  useEffect(() => {
    document.title = 'Merchandise | Guruvela';
  }, []);

  // Placeholder for Google Form Link - Update this when available
  const GOOGLE_FORM_LINK = "#";

  const iitProducts = [
    {
      id: 'iit-tshirt',
      name: 'IIT Mandi T-Shirt',
      description: 'Premium cotton T-Shirt featuring the official IIT Mandi logo.',
      price: '₹ --', // Price placeholder
      image: 'https://via.placeholder.com/300x300?text=IIT+T-Shirt',
    },
    {
      id: 'iit-hoodie',
      name: 'IIT Mandi Hoodie',
      description: 'Cozy hoodie with the official IIT Mandi emblem, perfect for campus winters.',
      price: '₹ --', // Price placeholder
      image: 'https://via.placeholder.com/300x300?text=IIT+Hoodie',
    },
  ];

  const nonIitProducts = [
    {
      id: 'non-iit-tshirt',
      name: 'Fan Edition T-Shirt',
      description: 'Stylish T-Shirt with a custom design for IIT Mandi aspirants and fans.',
      price: '₹ --', // Price placeholder
      image: 'https://via.placeholder.com/300x300?text=Fan+T-Shirt',
    },
    {
      id: 'non-iit-hoodie',
      name: 'Fan Edition Hoodie',
      description: 'Comfortable hoodie with a unique design to show your support.',
      price: '₹ --', // Price placeholder
      image: 'https://via.placeholder.com/300x300?text=Fan+Hoodie',
    },
  ];

  const ProductCard = ({ product }) => (
    <div className="card flex flex-col items-center text-center p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 h-full bg-white rounded-lg border border-gray-100">
      <div className="w-full aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>

      <a
        href={GOOGLE_FORM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full block py-2 rounded-md font-semibold text-white transition-colors"
        onClick={(e) => {
            if (GOOGLE_FORM_LINK === '#') {
                e.preventDefault();
                alert("Registration form coming soon!");
            }
        }}
      >
        If interested register here
      </a>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-6">
        <Link to="/" className="text-primary hover:underline font-medium">&larr; Back to Home</Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
          Merchandise Store
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Grab your exclusive IIT Mandi apparel. Whether you are a student or an aspirant, we have something for you!
        </p>
      </div>

      {/* IIT Students Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <div className="flex-grow h-px bg-gray-200"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 px-6">For IIT Mandi Students</h2>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {iitProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Non-IITians Section */}
      <section>
        <div className="flex items-center mb-8">
          <div className="flex-grow h-px bg-gray-200"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 px-6">For Non-IITians</h2>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {nonIitProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="mt-16 text-center text-gray-500 text-sm">
        <p>Disclaimer: Designs shown are for illustration purposes only. Final product may vary.</p>
      </div>
    </div>
  );
};

export default MerchandisePage;
