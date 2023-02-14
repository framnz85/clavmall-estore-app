import axios from "axios";

import { apiURL, estoreID } from "./env";

export const getRandomProducts = async (count, address) =>
  await axios.post(
    apiURL + "/products/random/" + count,
    { address },
    {
      headers: {
        estoreid: estoreID,
      },
    }
  );

export const getProduct = async (slug) =>
  await axios.get(apiURL + "/product/" + slug,
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getRelated = async (productId) =>
  await axios.get(apiURL + "/product/related/" + productId,
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getParent = async (productId) =>
  await axios.get(apiURL + "/product/parent/" + productId,
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const productStar = async (productId, star, authToken) =>
  await axios.put(
    apiURL + "/product/star/" + productId,
    { star },
    {
      headers: {
        authToken,
        estoreid: estoreID,
      },
    }
  );
  
export const fetchProductByFilter = async (arg, count, address) =>
  await axios.post(apiURL + "/search/filters/" + count, {
    arg,
    address,
  },
    {
      headers: {
        estoreid: estoreID,
      },
    });