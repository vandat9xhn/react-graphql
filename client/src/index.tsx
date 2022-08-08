import * as React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import * as serviceWorker from "./serviceWorker";
import App from "./App";

const client_graph = new ApolloClient({
  uri: "https://flyby-gateway.herokuapp.com/",
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client_graph}>
    <App />
  </ApolloProvider>
);

serviceWorker.unregister();