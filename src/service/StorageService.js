const getToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData !== null) {
    return userData.token;
  }
  return false;
};

export default getToken;
