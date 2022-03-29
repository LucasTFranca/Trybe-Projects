import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const requestToLogin = async (email, password) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

const requestToRegister = async (name, email, password) => {
  try {
    const { data } = await axios.post(`${baseUrl}/user`, {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

const requestAllProducts = async (Authorization) => {
  const { data } = await axios.get(`${baseUrl}/product`, { headers: { Authorization } });

  return data;
};

const requestAllSellers = async () => {
  const { data } = await axios.get(`${baseUrl}/seller`);
  return data;
};

const requestToAdminRegister = async ({ name, email, password, role }, Authorization) => {
  try {
    const { data } = await axios.post(`${baseUrl}/user/admin`, {
      name,
      email,
      password,
      role,
    },
    { headers: { Authorization } });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

const requestAllUsers = async (Authorization) => {
  const { data } = await axios.get(`${baseUrl}/user`, { headers: { Authorization } });

  return data;
};

const requestDeleteUser = async (id, Authorization) => {
  const { data } = await axios.delete(`${baseUrl}/user/${id}`, {
    headers: { Authorization },
  });

  return data;
};

const requestToRegisterNewOrder = async (order, Authorization) => {
  const { data } = await axios
    .post(`${baseUrl}/order`, order, { headers: { Authorization } });

  return data.id;
};

const requestOrderById = async (id, Authorization) => {
  const { data } = await axios
    .get(`${baseUrl}/order/details/${id}`, { headers: { Authorization } });

  return data;
};

const getAllOrders = async (id, Authorization) => {
  const { data } = await axios
    .get(`${baseUrl}/order/${id}`, { headers: { Authorization } });

  return data;
};

const requestToValidateToken = async (token) => {
  const { data } = await axios.post(`${baseUrl}/token`, { token });

  return data;
};

export {
  requestToLogin,
  requestToRegister,
  requestAllProducts,
  requestAllSellers,
  requestToRegisterNewOrder,
  requestOrderById,
  getAllOrders,
  requestToValidateToken,
  requestToAdminRegister,
  requestAllUsers,
  requestDeleteUser,
};
