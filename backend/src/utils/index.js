export { extractBearerToken, verifyAccessToken, signAccessToken } from './jwt.js';
export { setAuthCookies, clearAuthCookies, extractRefreshToken } from './cookies.js';
export { sanitizeUser, formatSession } from './user.js';

export function pickFields(object, fields) {
  return fields.reduce((result, field) => {
    if (object[field] !== undefined) {
      result[field] = object[field];
    }
    return result;
  }, {});
}

export function omitFields(object, fields) {
  const clone = { ...object };
  fields.forEach((field) => {
    delete clone[field];
  });
  return clone;
}
