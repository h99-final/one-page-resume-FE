export const emailCheck = (email) => {
  const regex =
    /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return regex.test(email);
};

export const phoneCheck = (phoneNum) => {
  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  return regPhone.test(phoneNum);
};

export const urlCheck = (gitUrl) => {
  const regUrl =
    /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;

  return regUrl.test(gitUrl);
};

export const renameKeys = (mapping, list) => {
  const renamedObjArr = [];

  for (let obj of list) {
    const renamedObj = [];

    for (let [before, after] of Object.entries(mapping)) {
      if (obj[before]) {
        renamedObj[after] = obj[before];
      }
    }
    renamedObjArr.push(renamedObj);
  }
  return renamedObjArr;
};

export const nameCheck = (name) => {
  const regName = /^[가-힣a-zA-Z]+$/;

  return regName.test(name);
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

// export const option = [
//   { stack: "JS", index: 0 },
//   { stack: "Android", index: 1 },
//   { stack: "Javascript", index: 1974 },
//   { stack: "Spring", index: 1974 },
//   { stack: "C", index: 1974 },
//   { stack: "C++", index: 1974 },
//   { stack: "React", index: 1974 },
//   { stack: "iOS", index: 1974 },
//   { stack: "Node,js", index: 1974 },
//   { stack: "Vue.js", index: 1974 },
//   { stack: "Git", index: 1974 },
// ];
export const option = [
  "JS",
  "Android",
  "Javascript",
  "Spring",
  "C",
  "C++",
  "React",
  "iOS",
  "Node.js",
  "Vue.js",
  "Git",
  "Github",
  "JAVA",
  "Python",
];
