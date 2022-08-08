import * as React from "react";

import FriendsOnline from "components/friends_online/FriendsOnline";

//
export interface AppProps {}

//
function App({}: AppProps) {
  //
  return (
    <div>
      <div>
        <FriendsOnline />
      </div>
    </div>
  );
}

export default App;
