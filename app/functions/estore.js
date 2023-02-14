import axios from "axios";

import { apiURL, estoreID } from "./env";

export const getEstoreInfo = async () =>
  await axios.get(apiURL +  "/setting/information/" + estoreID,
    {
      headers: {
        estoreid: estoreID,
      },
    });

export const getEstoreChanges = async () =>
  await axios.get(apiURL + "/setting/changes/" + estoreID,
    {
      headers: {
        estoreid: estoreID,
      },
    });