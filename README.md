# network_marketing

HOST: 194.67.105.44
PORT: 7777

## rest-api

* ```sh
    method: "get",
    url: "/api/user/get",
    url params: {
        login: string
    }

* ```sh
    method: "post", 
    url: "/api/user/delete",
    header params: {
        access-token: ("Bearer ${samtoken}")
    }
    body params: {
        _id :string
    }

* ```sh
    method: "post",
    url: "/api/user/create",
    body params: {
        login: String
        password: String
        email: String
        phone: String
        parent: String(логин партнера)
        region: String
    }

* ```sh
    method: "get",
    url: "/api/users",
    header params: {
        access-token: ("Bearer ${samtoken}")
    }

* ```sh
    method: "put",
    url: "/api/user/update",
    header params: {
        access-token: ("Bearer ${samtoken}")
    }
    body params: {
        login: String
        email: String
        phone: String
        region: String
        score: Number(Integer)
    }

* ```sh
    method: "post",
    url: "/api/auth/login",
    body params: {
        login: String
        password: String
    }

* ```sh
    method: "post",
    url: "/api/auth/logout",
    header params: {
        refresh-token: ("Bearer ${samtoken}")
    }

* ```sh
    method: "post",
    url: "/api/auth/refresh-token",
    header params: {
        refresh-token: ("Bearer ${samtoken}")
    }

* ```sh
    method: "post",
    url: "/api/user/send-money",
    header params: {
        access-token: ("Bearer ${samtoken}")
    },
    body params: {
        login: String,
        score: Number
    }

