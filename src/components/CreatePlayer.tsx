import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import {
  CreatePlayerMutation,
  CreatePlayerMutationVariables,
} from '../types/generated/graphql';

const CREATE_PLAYER = gql`
  mutation CreatePlayer($name: String!, $projectId: Int!) {
    insert_player(objects: { name: $name, project_id: $projectId }) {
      affected_rows
    }
  }
`;

type Props = {
  projectId: number;
};

const CreatePlayer = (props: Props) => {
  const [player, setPlayer] = useState<string | undefined>();

  const [createPlayer] = useMutation<
    CreatePlayerMutation,
    CreatePlayerMutationVariables
  >(CREATE_PLAYER);

  return (
    <div className={'container shadow border mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Create Player</h5>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            createPlayer({
              variables: {
                projectId: props.projectId,
                name: player!,
              },
            });
          }}
        >
          <input
            minLength={3}
            required={true}
            type={'text'}
            value={player}
            onChange={e => setPlayer(e.target.value)}
          />
          <button type="submit" className={'ml-3'}>
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlayer;
