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
    <div className="flex flex-col items-center text-center p-6 h-full bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="w-full aspect-square overflow-hidden rounded-md mb-4 bg-gray-50 flex items-center justify-center border border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">{product.description}</p>

      <a
        href={GOOGLE_FORM_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block py-2.5 rounded-md font-semibold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm"
        onClick={(e) => {
            if (GOOGLE_FORM_LINK === '#') {
                e.preventDefault();
                alert("Registration form coming soon!");
            }
        }}
      >
        Register Interest
      </a>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-start mb-8">
        <Link to="/" className="text-gray-500 hover:text-primary font-medium flex items-center transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
        </Link>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Official Merchandise
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Exclusive apparel for the IIT Mandi community and aspirants. High-quality, authentic gear.
        </p>
      </div>

      {/* IIT Students Section */}
      <section className="mb-20">
        <div className="flex items-center mb-10">
          <div className="h-px bg-gray-200 flex-grow"></div>
          <h2 className="text-2xl font-bold text-gray-800 px-6 uppercase tracking-wide">For IIT Mandi Students</h2>
          <div className="h-px bg-gray-200 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {iitProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Non-IITians Section */}
      <section className="mb-12">
        <div className="flex items-center mb-10">
          <div className="h-px bg-gray-200 flex-grow"></div>
          <h2 className="text-2xl font-bold text-gray-800 px-6 uppercase tracking-wide">For Aspirants & Fans</h2>
          <div className="h-px bg-gray-200 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {nonIitProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="mt-16 text-center border-t border-gray-100 pt-8">
        <p className="text-gray-400 text-sm">Disclaimer: Product images are for illustration only. Actual designs may vary.</p>
      </div>
    </div>
  );
};

export default MerchandisePage;
