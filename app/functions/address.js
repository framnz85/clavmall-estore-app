import axios from "axios";

import { apiURL, estoreID } from "./env";

export const getAllMyCountry = async () =>
  await axios.get(apiURL + "/address/mycountry",
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getAllMyAddiv1 = async (couid, coucode) =>
  await axios.get(
    apiURL +
      "/address/myaddiv1/" +
      couid +
      "/?coucode=" +
      coucode,
    {
      headers: {
        estoreid: estoreID,
      },
    }
  );

export const getAllMyAddiv2 = async (couid, addiv1, coucode) =>
  await axios.get(
    apiURL +
      "/address/myaddiv2/" +
      couid +
      "/" +
      addiv1 +
      "/?coucode=" +
      coucode,
    {
      headers: {
        estoreid: estoreID,
      },
    }
  );

export const getAllMyAddiv3 = async (couid, addiv1, addiv2, coucode) =>
  await axios.get(
    apiURL +
      "/address/myaddiv3/" +
      couid +
      "/" +
      addiv1 +
      "/" +
      addiv2 +
      "/?coucode=" +
      coucode,
    {
      headers: {
        estoreid: estoreID,
      },
    }
  );