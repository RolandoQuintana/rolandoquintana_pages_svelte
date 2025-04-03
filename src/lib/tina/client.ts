import { createClient } from 'tinacms';

export const client = createClient({
  apiUrl: 'http://localhost:3001/graphql',
  clientId: process.env.TINA_CLIENT_ID || '',
  tinaGraphQLVersion: '1.0.0',
});