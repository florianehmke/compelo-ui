import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import {
  LeaderboardSubscription,
  LeaderboardSubscriptionVariables,
  Player,
} from '../types/generated/graphql';

const LEADERBOARD = gql`
  subscription Leaderboard($gameId: Int!) {
    player {
      id
      name
      ratings(
        where: { match: { game_id: { _eq: $gameId } } }
        order_by: { id: desc }
        limit: 1
      ) {
        rating
      }
    }
  }
`;

type Props = {
  gameId: number;
};

const Leaderboard = (props: Props) => {
  const leaderBoardData = useSubscription<
    LeaderboardSubscription,
    LeaderboardSubscriptionVariables
  >(LEADERBOARD, { variables: { gameId: props.gameId } });

  const players = leaderBoardData?.data?.player
    .sort((p1, p2) => ratingOf(p2) - ratingOf(p1))
    .map(player => (
      <div className={'d-flex justify-content-between'} key={player.id}>
        <span>{player.name}</span>
        <strong>{ratingOf(player)}</strong>
      </div>
    ));

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Leaderboard</h5>
      {players}
    </div>
  );
};

const ratingOf = (player: Partial<Player>) => {
  return player?.ratings?.[0]?.rating ?? 1500;
};

export default Leaderboard;
