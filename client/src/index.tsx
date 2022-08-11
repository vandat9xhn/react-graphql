import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import * as serviceWorker from "./serviceWorker";
import App from "./App";

const client_graph = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

const root = createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client_graph}>
    <App />
  </ApolloProvider>
);

serviceWorker.unregister();
