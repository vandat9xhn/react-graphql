import * as React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";

//
export interface FriendsOnlineProps {}

interface User {
  id: number;
  name: string;
}

//
const GET_FRIENDS_ONLINE = gql`
  query GetFriendsOnline {
    users {
      id
      name
    }
  }
`;
const ADD_FRIENDS_ONLINE = gql`
  mutation AddNewFriend($name: String!) {
    addNewFriend(name: $name) {
      id
      name
    }
  }
`;

//
// const GET_LOCATIONS = gql`
//   query GetLocations {
//     locations {
//       id
//       name
//     }
//   }
// `;

//
function FriendsOnline({}: FriendsOnlineProps) {
  //
  const { loading, data } = useQuery<{ users: User[] }>(GET_FRIENDS_ONLINE);
  const [addNewFriend, { loading: adding }] = useMutation(ADD_FRIENDS_ONLINE, {
    refetchQueries: [
      {
        query: GET_FRIENDS_ONLINE,
      },
    ],
  });

  //
  const [value, setValue] = React.useState("");

  // ----

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleAddNewFriend = async () => {
    if (value) {
      // _addNewFriend();

      await addNewFriend({ variables: { name: value } });
      setValue("");
    }
  };

  const _addNewFriend = async () => {
    const res = await axios({
      method: "POST",
      url: "http://localhost:4000/",
      data: {
        operationName: "AddNewFriend",
        query: `mutation AddNewFriend($name: String!) {
            addNewFriend(name: $name) {
              id
              name
              __typename
            }
          }`,
        variables: { name: value },
        name: value,
      },
    });

    console.log(res);
  };

  //
  if (loading) {
    return <div>Loading...</div>;
  }

  //
  return (
    <div>
      <div>
        {data.users.map((item, ix) => (
          <div key={item.id}>
            Name: {item.name}, Id: {item.id}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={value}
          disabled={adding}
          onChange={handleChange}
        />

        <button type="button" disabled={adding} onClick={handleAddNewFriend}>
          Add New Friend
        </button>
      </div>
    </div>
  );
}

export default FriendsOnline;
