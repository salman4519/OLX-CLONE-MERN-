import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SellForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const cropperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/');
    } else {
      getHomeData();
    }
  }, [navigate]);

  const getHomeData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('/home', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error accessing home data:', error);
      navigate('/');
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!productName.trim()) errors.productName = 'Product name is required.';
    if (!description.trim()) errors.description = 'Description is required.';
    if (!price || price <= 0) errors.price = 'Price must be greater than zero.';
    if (!image) errors.image = 'Product image is required.';
    return errors;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const errors = validateFields();
    setError(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) throw new Error('Token not found. Please log in.');

      const cropper = cropperRef?.current?.cropper;
      const canvas = cropper?.getCroppedCanvas();
      if (!canvas) throw new Error('Error cropping image.');

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('image', blob);

      const response = await axios.post('http://localhost:5000/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Product added successfully!');
        resetForm();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setError((prevErrors) => ({ ...prevErrors, [field]: '' })); // Clear error for the specific field
    if (field === 'productName') setProductName(value);
    if (field === 'description') setDescription(value);
    if (field === 'price') setPrice(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError({ image: 'Please select a valid image file.' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError({ image: 'Image size should be less than 5MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError((prev) => ({ ...prev, image: '' })); // Clear image error
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setImage(null);
    setError({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                className={`mt-1 block w-full px-3 py-2 bg-white border ${
                  error.productName ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => handleFieldChange('productName', e.target.value)}
                aria-invalid={!!error.productName}
              />
              {error.productName && <p className="text-red-500 text-sm">{error.productName}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className={`mt-1 block w-full px-3 py-2 bg-white border ${
                  error.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                placeholder="Enter product description"
                value={description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                aria-invalid={!!error.description}
              />
              {error.description && <p className="text-red-500 text-sm">{error.description}</p>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                className={`mt-1 block w-full px-3 py-2 bg-white border ${
                  error.price ? 'border-red-500' : 'border-gray-300'
                } rounded-md`}
                placeholder="0.00"
                value={price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                aria-invalid={!!error.price}
              />
              {error.price && <p className="text-red-500 text-sm">{error.price}</p>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-600"
              />
              {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
            </div>

            {image && (
              <Cropper
                ref={cropperRef}
                src={image}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                dragMode="move"
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
              />
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Uploading...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
