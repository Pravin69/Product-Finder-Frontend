import { useEffect, useRef, useState } from 'react';
import SearchInput from './components/SearchInput';
import Table from './components/Table';
import { fetchAllProducts, fetchShopNameAndImage } from './utils/api';
import Loader from './components/Loader';

function App() {
  const [products, setProducts] = useState(null);
  const results = useRef(0);
  const searchedProduct = useRef(null);

  useEffect(
    function () {
      const initFunc = async function () {
        try {
          let productsData = await fetchAllProducts();
          results.current = productsData.count;
          productsData = await Promise.allSettled(
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
    [setProducts]
  );

  return (
    <div className="h-full flex flex-col gap-y-5 items-center">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight leading-none  md:text-5xl lg:text-6xl   bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text">
        Product Finder
      </h1>

      <SearchInput
        searchedProduct={searchedProduct}
        results={results}
        setProducts={setProducts}
      />
      {products ? (
        <Table
          searchedProduct={searchedProduct}
          setProducts={setProducts}
          count={results.current}
          products={products}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
