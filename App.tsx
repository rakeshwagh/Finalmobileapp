import React from "react";
import Navigation from "./Navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { network } from "./src/constants";

export const client = new ApolloClient({
  uri: `${network.serverip}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
}
