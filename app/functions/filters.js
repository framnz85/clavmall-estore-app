import axios from "axios";

import { apiURL, estoreID } from "./env";

export const getCategories = async (address) =>
  await axios.post(apiURL + "/categories", { address },
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getSubcats = async (count) =>
  await axios.get(apiURL + "/subcats/" + count,
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getParents = async (count) =>
  await axios.get(apiURL + "/parents/" + count,
    {
      headers: {
        estoreid: estoreID,
      },
    });
