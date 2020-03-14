import { useMutation } from '@apollo/react-hooks';
import * as bcrypt from 'bcryptjs';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import {
  CreateProjectMutation,
  CreateProjectMutationVariables
} from '../types/generated/graphql';

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $passwordHash: String!) {
    insert_project(objects: { name: $name, password_hash: $passwordHash }) {
      affected_rows
    }
  }
`;

const CreateProject = () => {
  const [project, setProject] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [passwordHash, setPasswordHash] = useState<string | undefined>();

  const [createProject] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT);

  const hashAndSetPassword = (password: string) => {
    setPassword(password);
    bcrypt.hash(password, 5, (_, hash) => {
      setPasswordHash(hash);
    });
  };

  return (
    <div className={'container shadow border mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Create Project</h5>
      <form
        onSubmit={e => {
          e.preventDefault();
          createProject({
            variables: {
              name: project!,
              passwordHash: passwordHash!
            }
          });
        }}
      >
        <div className={'form-row'}>
          <div className={'col'}>
            <input
              className={'form-control'}
              placeholder={'Name'}
              minLength={3}
              required={true}
              type={'text'}
              value={project}
              onChange={e => setProject(e.target.value)}
            />
          </div>
          <div className={'col'}>
            <input
              className={'form-control'}
              placeholder={'Password'}
              minLength={3}
              required={true}
              type={'password'}
              value={password}
              onChange={e => hashAndSetPassword(e.target.value)}
            />
          </div>
          <div className={'col'}>
            <button type="submit" className={'btn btn-primary w-100'}>
              Create Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
