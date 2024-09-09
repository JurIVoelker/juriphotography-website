// Set a cookie with a name, value, and optional settings (like expires, path, etc.)
export function setCookie(name, value, options = {}) {
  document.cookie = _buildCookieString(name, value, options);
}

// Get a cookie by name
export function getCookie(name) {
  return _readCookie(name);
}

// Delete a cookie by setting its expiration date to the past
export function deleteCookie(name, options = {}) {
  setCookie(name, "", { ...options, expires: -1 });
}

// Check if a cookie exists
function hasCookie(name) {
  return getCookie(name) !== null;
}

// Helper function to build the cookie string
function _buildCookieString(name, value, options) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Set expiration date if provided
  if (options.expires) {
    const expires = _getExpiresDate(options.expires);
    cookieString += `; expires=${expires}`;
  }

  // Set path if provided
  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  // Set domain if provided
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  // Set secure flag if provided
  if (options.secure) {
    cookieString += `; secure`;
  }

  // Set SameSite if provided
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  return cookieString;
}

// Helper function to get the expiration date
function _getExpiresDate(expires) {
  if (typeof expires === "number") {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000); // expires in days
    return date.toUTCString();
  } else if (expires instanceof Date) {
    return expires.toUTCString();
  }
  return null;
}

// Helper function to read cookies
function _readCookie(name) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((c) =>
    c.startsWith(`${encodeURIComponent(name)}=`)
  );
  if (cookie) {
    return decodeURIComponent(cookie.split("=")[1]);
  }
  return null;
}
