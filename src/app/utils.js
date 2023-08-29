import qs from "qs";

export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://strapi-27bu.onrender.com'}${path}`;
}

export function getStrapiAuthToken ()  {
    return process.env.STRAPI_API_TOKEN || 'd81f6b816636e69d7429d3dfd5e8330bea1e3b7a35c7c69b80b250398d957358883b9547e1e4f97bf06c490a5802d51194311b7ea5718155e4aa9ab177f415dca41648cee9b1a74c577dac99fb3eff2de0b2d3633a6172bacfe76b2ec6299d2bdeb5dee3ddebd0928518bd51c77cab032be17271b316ca0ca33640821433af4a';
}

export function getFlaskURL(path = '') {
  return `${process.env.FLASK_API || 'https://flask-hello-world-8ohc.onrender.com/'}${path}`;
}

export function getStrapiMedia(url) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(1), time));

export async function fetchStrapiAPI(
  path = "",
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getStrapiAuthToken()}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    console.log(`Fetching ${requestUrl} with options:`, mergedOptions);
    const response = await fetch(requestUrl, mergedOptions);
    const json = await response.json();
    console.log("src/app/utils.js", "fetchStrapiAPI", json);
    return json;
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function fetchFlaskAPI() {
  const mergedOptions = {
  }

  const response = await fetch(getFlaskURL(), mergedOptions);
  console.log("src/app/utils.js", getFlaskURL(), "fetchFlaskAPI", response);
  const json = await response.json();
  console.log("src/app/utils.js", "fetchFlaskAPI", json);
  return json;
}