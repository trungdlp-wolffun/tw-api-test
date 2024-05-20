// global-setup.js
const { request } = require('@playwright/test');

module.exports = async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post("https://auth.staging.thetanarena.com/auth/v1/loginByEmail", {
    data:{
        "email": "khangtdd+1@wolffungame.com",
    },
  });

  const responseBody = await response.json();
  if (responseBody.success && responseBody.data && responseBody.data.accessToken) {
    global.accessToken = responseBody.data.accessToken;
  } else {
    throw new Error('Failed to obtain access token');
  }
  console.log(responseBody)
};