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

export const option = [
  "HTML",
  "AWS",
  "Anaconda",
  "Android",
  "Angular",
  "Axios",
  "Azura",
  "Babel",
  "BootStrap",
  "TS",
  "C",
  "C++",
  "C#",
  "CSS",
  "Chromium",
  "django",
  "Docker",
  "EhCache",
  "Express",
  "Firebase",
  "Flask",
  "Flutter",
  "git",
  "Github",
  "Github API",
  "Github Actions",
  "Go",
  "Gradle",
  "GraphQL",
  "iOS",
  "JPA",
  "JUnit",
  "JWT",
  "Java",
  "JavaScript",
  "SCSS",
  "JS",
  "Jenkins",
  "Jest",
  "JSP",
  "Kotlin",
  "Kubernetes",
  "MariaDB",
  "Material-ui",
  "Maven",
  "MongoDB",
  "Mysql",
  "Mssql",
  "NestJS",
  "Next.js",
  "Nginx",
  "Node.js",
  "Oauth2",
  "PostgreSQL",
  "PHP",
  "Python",
  "QueryDSL",
  "RabbitMQ",
  "RaspberryPi",
  "React",
  "React-Flow",
  "React-Hooks",
  "React-Native",
  "React-Native-Reanimated",
  "React-Native-SVG",
  "React-Navigation",
  "React-Saga",
  "React-Slick",
  "React-Three-Fiber",
  "Reactstrap",
  "Recoil",
  "Redis",
  "Redux",
  "Ruby",
  "RxJava",
  "Sequelize",
  "SnapKit",
  "SocketIO",
  "Spring",
  "Spring-Batch",
  "Spring-Boot",
  "Spring-Security",
  "StompJS",
  "Supabase",
  "Swagger",
  "Swift",
  "Thymeleaf",
  "Vue.js",
  "WebRTC",
  "WebSocket",
  "WebPack",
  "jQuery",
  "SockJS",
];
