const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

//
const users = [
  {
    id: 1,
    name: 'Nguyen Nguyen',
  },
  {
    id: 2,
    name: 'My Nguyen',
  },
  {
    id: 3,
    name: 'My My',
  },
];

const typeDefs = gql`
  type User {
    id: Int
    name: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addNewFriend(name: String!): User
  }
`;
const resolvers = {
  Query: {
    users: () => users,
  },

  Mutation: {
    addNewFriend: (...params) => {
      const new_user = {
        id: users.slice(-1)[0].id + 1,
        name: params[1].name,
      };
      users.push(new_user);

      return new_user;
    },
  },
};

//
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log('Server serve from', url);
});
