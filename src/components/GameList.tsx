import { useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ListItem from '../shared/ListItem';
import {
  DeleteGameMutation,
  DeleteGameMutationVariables,
  GamesSubscription,
  GamesSubscriptionVariables
} from '../types/generated/graphql';

export const GAMES_SUBSCRIPTION = gql`
  subscription Games($projectId: Int!) {
    game(where: { project_id: { _eq: $projectId } }) {
      id
      name
    }
  }
`;

const DELETE_GAME = gql`
  mutation DeleteGame($id: Int!) {
    delete_game(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

type Props = {
  projectId: number;
};

const GameList = (props: Props) => {
  const history = useHistory();
  const gameData = useSubscription<
    GamesSubscription,
    GamesSubscriptionVariables
  >(GAMES_SUBSCRIPTION, { variables: { projectId: props.projectId } });

  const [deleteGame] = useMutation<
    DeleteGameMutation,
    DeleteGameMutationVariables
  >(DELETE_GAME);

  const games = gameData?.data?.game?.map(value => (
    <ListItem
      key={value.id}
      entity={value}
      onSelect={v => history.push(`/project/${props.projectId}/game/${v.id}`)}
      onDelete={v => deleteGame({ variables: { id: v.id } })}
    />
  ));

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Select Game</h5>
      {games}
    </div>
  );
};

export default GameList;
