import { jwtDecode } from "jwt-decode";

export const checkAuth = (token) => {
  let userId = null;
  let isTokenExpired = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // زمان فعلی برحسب ثانیه
      const currentTimeStamp = Math.floor(Date.now() / 1000);

      const expireTimeStamp = decodedToken.exp;
      
      if (expireTimeStamp < currentTimeStamp) {
        isTokenExpired = true;
      } else {
        userId = decodedToken.id;
      }
    } catch (error) {
      console.log(`Error Decoding Token : ${error}`);
    }
  } else {
    console.log("Token not provided");
  }

  return {
    userId,
    isTokenExpired,
  };
};
