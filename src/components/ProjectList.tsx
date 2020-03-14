import { useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from '../components/ListItem';
import {
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
  ProjectsSubscription,
  ProjectsSubscriptionVariables
} from '../types/generated/graphql';

export const PROJECTS_SUBSCRIPTION = gql`
  subscription Projects {
    project {
      id
      name
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    delete_project(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const ProjectList = () => {
  const history = useHistory();
  const projectData = useSubscription<
    ProjectsSubscription,
    ProjectsSubscriptionVariables
  >(PROJECTS_SUBSCRIPTION);

  const [deleteProject] = useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DELETE_PROJECT);

  const projects = projectData?.data?.project?.map(value => (
    <ListItem
      key={value.id}
      entity={value}
      onSelect={v => history.push(`project/${v.id}`)}
      onDelete={v => deleteProject({ variables: { id: v.id } })}
    />
  ));

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Select Project</h5>
      {projects}
    </div>
  );
};

export default ProjectList;
