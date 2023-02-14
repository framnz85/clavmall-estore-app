import axios from "axios";

import { apiURL, estoreID } from "./env";

export const emptyUserCart = async (authToken) =>
  await axios.delete(apiURL +  "/user/cart", {
    headers: {
      authToken,
      estoreid: estoreID,
    },
  });

export const addToWishlist = async (productId, authToken) =>
  await axios.post(
    apiURL + "/user/wishlist",
    { productId },
    {
      headers: {
        authToken,
        estoreid: estoreID,
      },
    }
  );

export const getUserOrders = async (
  sortkey,
  sort,
  currentPage,
  pageSize,
  searchQuery,
  minPrice,
  maxPrice,
  dateFrom,
  dateTo,
  status,
  payment,
  authToken
) =>
  await axios.post(apiURL + "/user/orders", {
    sortkey,
    sort,
    currentPage,
    pageSize,
    searchQuery,
    minPrice,
    maxPrice,
    dateFrom,
    dateTo,
    status,
    payment,
  }, {
    headers: {
      authToken,
      estoreid: estoreID,
    },
  });

export const getUserOrder = async (orderId, authToken) =>
  await axios.get(apiURL + "/user/order/" + orderId, {
    headers: {
      authToken,
      estoreid: estoreID,
    },
  });