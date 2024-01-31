const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT;

const fetchAllProducts = async (offset = 0, keyword = null) => {
  let queryString = '';

  queryString += `?offset=${offset}`;

  if (keyword) queryString += `&keywords=${keyword}`;

  // console.log(queryString);

  try {
    const res = await fetch(BASE_URL + queryString);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Something went wrong 😅');
  }
};

const fetchProduct = async (id) => {
  try {
    const res = await fetch(BASE_URL + `/getProduct/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Something went wrong 😥');
  }
};

const fetchProductReviews = async (id) => {
  try {
    const res = await fetch(BASE_URL + `/getProductReview/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Something went wrong');
  }
};

const fetchShopNameAndImage = async (id) => {
  try {
    const res = await fetch(BASE_URL + `/getProductSellerImage/${id}`);
    const data = await res.json();
    return {
      shopName: data.shopName,
      image: data.image,
    };
  } catch (error) {
    console.log('Something went wrong 😥');
  }
};

export {
  fetchAllProducts,
  fetchProduct,
  fetchShopNameAndImage,
  fetchProductReviews,
};
