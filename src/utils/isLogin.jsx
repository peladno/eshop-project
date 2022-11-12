function hasJWT() {
  let flag = false;
  const tokenKey = localStorage.getItem("token");

  tokenKey ? (flag = true) : (flag = false);

  return flag;
}
export default hasJWT;
