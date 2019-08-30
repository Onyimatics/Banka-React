import jwtDecode from 'jwt-decode';


export const saveToLocalStorage = ({ token, url }) => {
  if (token) {
    localStorage.setItem('token', token);
    if (url) localStorage.setItem('url', url);
  }
};

export const decodeToken = ({ history }) => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp, iat, ...userData } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return userData;
    }
    return history && history.push('/signin');
  }
  return history && history.push('/signin');
};
