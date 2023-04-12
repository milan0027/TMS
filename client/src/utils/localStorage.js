export const addTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("token");
  const token = result ? result : null;
  return token;
};

export const addTypeToLocalStorage = (type) => {
  localStorage.setItem("type", type);
};

export const removeTypeFromLocalStorage = () => {
  localStorage.removeItem("type");
};

export const getTypeFromLocalStorage = () => {
  const result = localStorage.getItem("type");
  const type = result ? result : null;
  return type;
};