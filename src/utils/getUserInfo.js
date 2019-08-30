import jwtDecode from 'jwt-decode';

const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp, iat, ...userData } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return userData;
    }
  }
  return false;
};

export default getUserInfo;
