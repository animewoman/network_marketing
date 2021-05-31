# network_marketing

HOST: 194.67.105.44
PORT: 7777

## rest-api

* ```sh
    method: "get",
    url: "/api/user/get",
    url params: {
        _id: string
    }

* ```sh
    method: "post", 
    url: "/api/user/delete",
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
    url: "/api/users"

* ```sh
    method: "put",
    url: "/api/user/update",
    body params: {
        login: String
        email: String
        phone: String
        region: String
        score: Number(Integer)
    }
