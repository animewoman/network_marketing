const axios = require('axios').default;


(async () => {
  console.log("start");
  try {
    await axios.post("194.67.105.44:7777/api/user/create", {
      "login": "1",
      "fullName": "1 2",
      "email": "sdf@gmail.com",
      "phone": "777179420",
      "password": "123",
      "region": "bishKEK"
    });
    console.log('asdf');
    let cnt = 1;
    for (let i = 1; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        cnt++;
        await axios.post("194.67.105.44:7777/api/user/create", {
          "login": cnt.toString(),
          "fullName": "1 2",
          "parent": i.toString(),
          "email": "sdf@gmail.com",
          "phone": "777179420",
          "password": "123",
          "region": "bishKEK"
        })
      }
    }
  } catch (err) {
    console.log(err);
  }
})();