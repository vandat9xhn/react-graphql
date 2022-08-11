import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { encodeAccessToken, saveUserToCookie } from './utils/jwt.js';

//
const users = [
  {
    id: 1,
    username: 'username1',
    password: 'password1',
    name: 'Nguyen Nguyen',
  },
  {
    id: 2,
    username: 'username2',
    password: 'password2',
    name: 'My Nguyen',
  },
  {
    id: 3,
    username: 'username3',
    password: 'password3',
    name: 'My My',
  },
];

const typeDefs = gql`
  type UserBase {
    id: Int
    name: String
    access_token: String
  }

  type Friend {
    
  }

  type Query {
    users: [UserBase]
  }

  type Mutation {
    registry(name: String!): UserBase
    login(username: String!, password: String!): UserBase
  }
`;
const resolvers = {
  Query: {
    users: () => users,
  },

  Mutation: {
    registry: (...params) => {
      const new_user = {
        id: users.slice(-1)[0].id + 1,
        name: params[1].name,
      };
      users.push(new_user);
      saveUserToCookie(params[1].res, new_user.id);

      return new_user;
    },
    login: (...params) => {
      const { username, password } = params[1];
      const user = users.find(
        (item) => item.username === username && item.password === password
      );

      if (!user) {
        return null;
      }

      saveUserToCookie(params[2].res, user.id);
      const access_token = encodeAccessToken(user.id);
      return { id: user.id, name: user.name, access_token: access_token };
    },
  },
};

//
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req, res }) => {
    // console.log(req.headers.cookie);
    return { res };
  },
  cors: {
    credentials: true,
    origin: ['http://localhost:8000'],
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log('Server serve from', url);
});
