const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const setCookie = (name, value, exp = 5) => {
  // if (document.cookie) {
  //   return;
  // }
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 10000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()} + ; path=/`;
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  document.cookie = `${name}=; expires=${date}`;
};

const resetCookie = (name) => {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie =
    name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
};

export { getCookie, setCookie, deleteCookie, resetCookie };
