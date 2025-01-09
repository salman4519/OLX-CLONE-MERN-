import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Heart, Share, Flag, MapPin, Clock, MessageCircle , Shield } from 'lucide-react';


const Details = () => {
  const location = useLocation();
  const product = location?.state?.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Home / {product?.category || 'Products'} / {product?.title}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={product?.imageUrl}
                  alt={product?.title}
                  className="w-full h-full object-contain bg-gray-50"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Share className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Product Details Card */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{product?.title}</h1>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-3xl font-bold text-green-600">${product?.price}</p>
                  <p className="text-gray-600">{product?.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{product?.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Posted {product?.postedDate || 'recently'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Seller Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  {product?.createdBy?.[0]?.toUpperCase()}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-900">{product?.createdBy}</h2>
                  <p className="text-sm text-gray-500">Member since 2025</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-cyan-950 hover:bg-cyan-900 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  Show Phone Number
                </button>
                <button className="w-full bg-white hover:bg-gray-50 border-2 border-cyan-950 text-cyan-950 py-3 px-4 rounded-lg flex items-center justify-center transition-colors">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with Seller
                </button>
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-yellow-500" />
                <h2 className="font-semibold text-gray-900">Safety Tips</h2>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  Meet in a safe public place
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  Check the item before buying
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  Pay only after collecting item
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
