import axios from "axios";

import { apiURL, estoreID } from "./env";

export const createOrUpdateUser = async (authToken, address) => {
  return await axios.post( apiURL + "/create-or-update-user",
    { address },
    {
      headers: {
        authToken,
        estoreid: estoreID,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post( apiURL + "/current-user",
    {},
    {
      headers: {
        authToken,
        estoreid: estoreID,
      },
    }
  );
};
