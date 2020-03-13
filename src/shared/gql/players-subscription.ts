import gql from 'graphql-tag';

export const PLAYERS_SUBSCRIPTION = gql`
  subscription Players($projectId: Int!) {
    player(where: { project_id: { _eq: $projectId } }) {
      id
      name
    }
  }
`;
