/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { fetchProduct } from '../utils/api';
import uuid from 'react-uuid';
import { fetchProductReviews } from '../utils/api';

const ExpandedRow = ({ item }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async function () {
      try {
        let data1 = await fetchProduct(item?.listing_id);
        const data2 = await fetchProductReviews(item?.listing_id);
        data1 = {
          ...data1,
          ...data2,
        };
        setProduct(data1);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [item]);

  return (
    <td colSpan={5} className="w-full">
      <div className="flex">
        <Carousel images={product?.images} />
        <div className="m-4 h-44">
          <h2 className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-900">
            {product?.title}
          </h2>
          <div className="mb-4 flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="text-sm font-bold text-gray-900">
              {product?.averageRating?.toPrecision(2)}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full" />
            <a
              href="#"
              className="text-sm font-medium text-gray-900 underline hover:no-underline "
            >
              {product?.totalReviews} reviews
            </a>
          </div>
          <div className="mb-3 text-sm font-medium text-gray-800 ">
            {' '}
            Seller:{' '}
            <span className="text-sm font-medium text-gray-500">
              {product?.shop?.shop_name}
            </span>
          </div>
          <div className="mb-3 text-sm font-medium text-gray-800 ">
            {' '}
            Price:{' '}
            <span className="text-sm font-medium text-gray-500">
              {product?.price?.amount} {product?.price?.currency_code}
            </span>
          </div>
          <div className="mb-3 text-sm font-medium text-gray-800 ">
            {' '}
            Rank:{' '}
            <span className="text-sm font-medium text-gray-500">
              {product?.featured_rank < 0 ? 0 : product?.featured_rank}
            </span>
          </div>
        </div>
        <div className="w-2/3 m-4">
          <h1 className="mb-4 text-lg font-medium text-gray-900">Tags</h1>
          <ul className="grid grid-cols-2 text-sm font-medium space-y-1 text-gray-400 list-disc list-inside ">
            {product?.tags?.map((el) => (
              <li key={uuid()}>{el}</li>
            ))}
          </ul>
        </div>
      </div>
    </td>
  );
};

export default ExpandedRow;
