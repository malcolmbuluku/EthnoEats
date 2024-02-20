import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { TOKEN_KEY, APIURL, API_CLIENT_ID, APP_ORIGIN } from "../store/vars";

function useRequest() {
  async function withAuth({ URL, method, data }) {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    try {
      const response = await axios({
        method,
        timeout: 50000,
        url: `${APIURL}${URL}`,
        headers: {
          Authorization: `Bearer ${token}`,
          client_id: API_CLIENT_ID,
          origin: APP_ORIGIN,
        },
        data,
      });

      return {
        hasError: false,
        message: "success",
        data: response.data,
      };
    } catch (error) {
      console.log("TC-withAuth.error", error.message);
      const { response } = error;

      // console.log("response?.data", response?.data);

      const errorData = response?.data || {
        message: error.message || "Could not send your request.",
        status: "failed",
      };

      return {
        hasError: true,
        message: errorData.message,
      };
    }
  }

  async function withNoAuth({ URL, method, data }) {
    try {
      const response = await axios({
        method,
        timeout: 50000,
        // headers: {
        //   client_id: API_CLIENT_ID,
        //   origin: APP_ORIGIN,
        // },
        url: `${APIURL}${URL}`,
        data,
      });
      return {
        hasError: false,
        message: "success",
        data: response.data,
      };
    } catch (error) {
      const { response } = error;
      const errorData = response?.data || {
        message: error.message || "Could not send your request.",
        status: "failed",
      };

      return {
        hasError: true,
        message: errorData.message,
        data: errorData,
      };
    }
  }

  return {
    withAuth,
    withNoAuth,
  };
}

export default useRequest;