const options = [];
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  });
}

const initialCommit = {
  is_loading: true,
  commits: [
    {
      sha: "0",
      message: "첫번째 커밋",
    },
    {
      sha: "1",
      message: "두번째 커밋",
    },
  ],
};

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const loadOptions = async (search, prevOptions) => {
  // 800초씩 늦추는거 여기서 axios 가 필요한데?
  // 생각해보니 근본적으로 githubApi를 앞당겨주지는 않음
  await sleep(800);
  console.log(search);
  let filteredOptions;
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
    );
  }

  const hasMore = filteredOptions.length > prevOptions.length + 10;
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + 10
  );

  return {
    options: slicedOptions,
    hasMore,
  };
};

export default loadOptions;
