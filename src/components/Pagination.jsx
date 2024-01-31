/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { fetchAllProducts, fetchShopNameAndImage } from '../utils/api';

const Pagination = ({ setProducts, count }) => {
  const [searchParams, setSearchParams] = useState(null);
  const currentPage = !searchParams ? 1 : Number(searchParams);
  const pageCount = Math.ceil(count / 10);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    setSearchParams(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    setSearchParams(prev);
  }

  useEffect(
    function () {
      const initFunc = async function () {
        try {
          let offset = (currentPage - 1) * 10;
          let productsData = await fetchAllProducts(offset);
          productsData = await Promise?.allSettled(
            productsData?.results?.map(async (item) => {
              const additionalInfo = await fetchShopNameAndImage(
                item?.listing_id
              );

              return {
                ...item,
                shopName: additionalInfo.shopName,
                image: additionalInfo.image,
              };
            })
          );
          setProducts(productsData);
        } catch (error) {
          console.log(error);
        }
      };
      initFunc();
    },
    [searchParams]
  );

  if (pageCount <= 1) return null;

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{' '}
        <span className="font-semibold text-gray-900 ">
          {(currentPage - 1) * 10 + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-gray-900 ">
          {currentPage === pageCount ? count : currentPage * 10}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 ">
          {count ? count : 0} results
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 font-medium"
          >
            Previous
          </button>
        </li>
        <li>
          <button
            disabled={currentPage === pageCount}
            onClick={nextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 font-medium"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
