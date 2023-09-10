function checkPassword(password) {
  return password === process.env.REACT_APP_LOADING_SCREEN_PW;
}

export default checkPassword;
