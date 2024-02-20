const development = true;
export const API_CLIENT_ID = "";

export const TOKEN_KEY = "";
export const COLOR_MODE_KEY = "";

export const SERVER_URL = development
  ? "https://5vq3tz76-5000.inc1.devtunnels.ms"
  : "";

export let SOCKET_URL = "";

export const APIURL = `${SERVER_URL}/v1`;

export const SPACES_CDN_URL = ``; // TODO Add space URL

export const PROFILE_IMAGE_URL = `${SPACES_CDN_URL}/assets/images/users`;
export const IMAGE_FORMATS = "image/jpeg, image/png";

export const APPLICATION_AUTH_KEY =[]; // XXX always update on role deployments
export const APP_ORIGIN = ``; // TODO update to app origin
export let GOOGLE_API_KEY = ""; // TODO update to prod
export let PROJECT_ID = "b87f3334-b6f1-454a-9756-5be7b2fdaa5b"; // TODO update to prod

export const LOCATION_TASK_KEY = "location-tracking";