import * as React from "react";

import Login from "components/login/Login";

//
export interface AppProps {}

//
function App({}: AppProps) {
  //
  return (
    <div>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default App;
