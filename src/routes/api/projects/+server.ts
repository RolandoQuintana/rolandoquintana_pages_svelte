import { createClient } from "tinacms";
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

const isProduction = process.env.NODE_ENV === 'production';

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  body: string;
}

interface ProjectEdge {
  node: Project;
}

interface ProjectConnection {
  data: {
    projectConnection: {
      edges: ProjectEdge[];
    };
  };
}

const apiUrl = isProduction
  ? 'https://content.tinajs.io/content/2c3c6f09-7aaa-4a67-9656-8b3c92d80ad2'
  : 'http://localhost:4001/graphql';

const client = createClient({
  apiUrl,
  clientId: env.TINA_CLIENT_ID || '',
  tinaGraphQLVersion: '1.0.0'
});

export async function GET() {
  try {
    const query = `#graphql
      {
        projectConnection {
          edges {
            node {
              id
              title
              description
              thumbnail
              technologies
              githubUrl
              liveUrl
              body
            }
          }
        }
      }
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': env.TINA_CLIENT_ID || '',
      },
      body: JSON.stringify({
        query
      })
    });

    const projectsResponse = (await response.json()) as ProjectConnection;
    console.log('API Response:', projectsResponse);

    if ('errors' in projectsResponse) {
      console.error('GraphQL Errors:', projectsResponse.errors);
      return json({ error: 'Failed to fetch projects' }, { status: 500 });
    }

    const projects = projectsResponse.data.projectConnection.edges.map((edge: ProjectEdge) => edge.node);
    console.log('Processed Projects:', projects);
    return json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}