const fetch = require('node-fetch');

async function simple() {
  return 1;
}

async function showAvatar(username) {

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${username}`);
  let githubUser = await githubResponse.json();

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  console.log(githubUser);
  
  let val = await simple();
  console.log(`awaited val is ${val}`);
  
  return githubUser;
}

showAvatar('bryanwb');

