function isAdmin() {
  let flag = false;
  const tokenKey = localStorage.getItem("role");

 if (tokenKey) {
  return  tokenKey === "admin" ? (flag = true) : (flag = false);
 }

  return flag;
}
export default isAdmin; 