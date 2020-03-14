import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';

import {
  CreateGameMutation,
  CreateGameMutationVariables,
} from '../types/generated/graphql';

const CREATE_GAME = gql`
  mutation CreateGame($name: String!, $projectId: Int!) {
    insert_game(objects: { name: $name, project_id: $projectId }) {
      affected_rows
    }
  }
`;

type Props = {
  projectId: number;
};

const CreateGame = (props: Props) => {
  const [game, setGame] = useState<string | undefined>();

  const [createGame] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME);

  return (
    <div className={'container shadow border mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Create Game</h5>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            createGame({
              variables: {
                projectId: props.projectId,
                name: game!,
              },
            });
          }}
        >
          <input
            minLength={3}
            required={true}
            type={'text'}
            value={game}
            onChange={e => setGame(e.target.value)}
          />
          <button type="submit" className={'ml-3'}>
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
