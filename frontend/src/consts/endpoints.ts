const API_ENDPOINTS = {
  login: '/auth/login',
  register: '/user',
  refreshToken: '/auth/refresh',
  products: '/product/all',
  productById: (id: string) => `/product/${id}`,
  createProduct: '/product',
};

export default API_ENDPOINTS;
