import { createClient } from "tinacms";
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

const client = createClient({
  apiUrl: 'http://localhost:4001/graphql',
  clientId: env.TINA_CLIENT_ID || '',
  tinaGraphQLVersion: '1.0.0'
});

export async function GET() {
  const projectsResponse = await (client as any).queries.projectConnection();
  const projects = projectsResponse.data.projectConnection.edges?.map(edge => edge?.node) || [];
  return json(projects);
}