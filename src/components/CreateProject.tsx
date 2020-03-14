import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import {
  CreateProjectMutation,
  CreateProjectMutationVariables
} from '../types/generated/graphql';

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!) {
    insert_project(objects: { name: $name }) {
      affected_rows
    }
  }
`;

const CreateProject = () => {
  const [project, setProject] = useState<string | undefined>();

  const [createProject] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT);

  return (
    <div className={'container shadow border mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Create Project</h5>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            createProject({
              variables: {
                name: project!
              }
            });
          }}
        >
          <input
            minLength={3}
            required={true}
            type={'text'}
            value={project}
            onChange={e => setProject(e.target.value)}
          />
          <button type="submit" className={'ml-3'}>
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
