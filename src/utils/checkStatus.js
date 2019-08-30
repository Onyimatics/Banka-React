import jwtDecode from 'jwt-decode';

const checkStatus = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp, iat, ...userData } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      switch (userData.type) {
        case 'client':
          return '/user-dashboard';
          break;
        case 'staff':
          return '/staff-dashboard';
          break;
      }
    }
  }
};
export default checkStatus;
