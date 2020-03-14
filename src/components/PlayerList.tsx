import React from 'react';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ListItem from '../components/ListItem';
import {
  DeletePlayerMutation,
  DeletePlayerMutationVariables,
  PlayersSubscription,
  PlayersSubscriptionVariables,
} from '../types/generated/graphql';
import { PLAYERS_SUBSCRIPTION } from '../shared/gql/players-subscription';

const DELETE_PLAYER = gql`
  mutation DeletePlayer($id: Int!) {
    delete_player(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

type Props = {
  projectId: number;
};

const PlayerList = (props: Props) => {
  const playerData = useSubscription<
    PlayersSubscription,
    PlayersSubscriptionVariables
  >(PLAYERS_SUBSCRIPTION, { variables: { projectId: props.projectId } });

  const [deletePlayer] = useMutation<
    DeletePlayerMutation,
    DeletePlayerMutationVariables
  >(DELETE_PLAYER);

  const players = playerData?.data?.player?.map(value => (
    <ListItem
      key={value.id}
      entity={value}
      onDelete={v => deletePlayer({ variables: { id: v.id } })}
    />
  ));

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Players</h5>
      {players}
    </div>
  );
};

export default PlayerList;
