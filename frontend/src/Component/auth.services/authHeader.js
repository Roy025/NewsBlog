export default function authHeader() {
  const validateToken = localStorage.getItem("accesstoken");
  console.log(validateToken);
  if (validateToken) {
    return { authorization: validateToken };
  } else {
    return {};
  }
}
