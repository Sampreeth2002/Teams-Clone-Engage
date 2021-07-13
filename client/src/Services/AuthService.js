const AuthService = {
  //Sends POST request to server to check crediantls
  login: (user) => {
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401)
        return res.json().then((data) => {
          return data;
        });
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },

  //Sends POST request to server to add username
  register: (user) => {
    return fetch("/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "" } };
    });
  },
};

export default AuthService;
