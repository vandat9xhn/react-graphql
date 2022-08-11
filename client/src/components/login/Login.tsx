import * as React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";

//
export interface LoginProps {}

interface User {
  id: number;
  name: string;
  access_token: string;
}

const ADD_FRIENDS_ONLINE = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      name
      access_token
    }
  }
`;

//
function Login({}: LoginProps) {
  const [login, { loading, data, error }] = useMutation<{ login: User }>(
    ADD_FRIENDS_ONLINE,
    {}
  );

  //
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  // ----

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handleLogin :React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (user.username && user.password) {
      const res = await login({
        variables: { username: user.username, password: user.password },
      });

      console.log(res);
      
      setUser({ username: "", password: "" });
    }
  };

  // const _addNewFriend = async () => {
  //   const res = await axios({
  //     method: "POST",
  //     url: "http://localhost:4000/",
  //     data: {
  //       operationName: "AddNewFriend",
  //       query: `mutation AddNewFriend($name: String!) {
  //           addNewFriend(name: $name) {
  //             id
  //             name
  //             __typename
  //           }
  //         }`,
  //       variables: { name: value },
  //       name: value,
  //     },
  //   });

  //   console.log(res);
  // };

  //
  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            name="username"
            value={user.username}
            disabled={loading}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={user.password}
            disabled={loading}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading} onClick={handleLogin}>
          Login
        </button>
      </form>

      {data && data.login && (
        <div>
          <div>Id: {data.login.id}</div>

          <div>Name: {data.login.name}</div>

          <div>Access_token: {data.login.access_token}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
