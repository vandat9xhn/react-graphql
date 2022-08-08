import * as React from "react";
import { gql, useQuery } from "@apollo/client";

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

// 
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
    }
  }
`;

//
function FriendsOnline({}: FriendsOnlineProps) {
  //
  const { loading, data } = useQuery(GET_LOCATIONS);

  //
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  
  //
  return (
    <div>
      {/* {data.users.map((item, ix) => (
        <div>
          Name: {item.name}, Id: {item.id}
        </div>
      ))} */}
    </div>
  );
}

export default FriendsOnline;
