

export const API_BASE_URL = process.env.REACT_APP_API_URL;

// get user Information from local storage
export const getUserAuthInfo = () => {
    return localStorage.getItem("userInfo") || "";
  };

  // config the authentication token for api calls
  export const configAuth = (userInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(userInfo).access_token}`,
      },
    };
    return config;
  };