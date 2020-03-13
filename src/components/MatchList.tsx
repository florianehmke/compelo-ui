import { useSubscription } from '@apollo/react-hooks';
import { formatDistance, parseISO } from 'date-fns';
import gql from 'graphql-tag';
import * as React from 'react';

import {
  MatchesSubscription,
  MatchesSubscriptionVariables,
  Rating,
  Team
} from '../types/generated/graphql';

const MATCH_LIST = gql`
  subscription Matches($gameId: Int!) {
    match(where: { game_id: { _eq: $gameId } }, order_by: { date: desc }) {
      uuid
      date
      game_id
      teams {
        id
        result
        score
        appearances {
          player_id
          player {
            name
          }
        }
      }
      ratings {
        rating
        rating_before
        player_id
      }
    }
  }
`;

type Props = {
  gameId: number;
};

const MatchList = (props: Props) => {
  const matchData = useSubscription<
    MatchesSubscription,
    MatchesSubscriptionVariables
  >(MATCH_LIST, { variables: { gameId: props.gameId } });

  const matches = (matchData?.data?.match ?? []).map(match => (
    <div key={match.uuid} className={'mt-1 row'}>
      <div className={'col-3 d-flex align-items-center'}>
        <small className={'text-muted'}>
          {formatDistance(parseISO(match.date), new Date()) + ' ago'}
        </small>
      </div>
      {teams(match.teams, match.ratings)}
    </div>
  ));

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Match List</h5>
      {matches}
    </div>
  );
};

const teams = (teams: Partial<Team>[], ratings: Partial<Rating>[]) => {
  ratings.map(value => value.player_id);
  return teams.map(team => (
    <div key={team.id} className={'col text-center'}>
      <div>{team?.appearances?.map(value => value.player.name).join(', ')}</div>
      <div>
        <small className={'text-muted'}>Score: </small>
        <small>{team.score}</small>
        <small className={'text-muted'}> Rating: </small>
        <small>{deltaForTeam(team, ratings)}</small>
      </div>
    </div>
  ));
};

const deltaForTeam = (
  team: Partial<Team>,
  ratings: Partial<Rating>[]
): number | null => {
  const rating = ratings.find(
    rating => rating.player_id === team?.appearances?.[0].player_id
  );
  if (rating) {
    return rating.rating! - rating.rating_before!;
  }
  return null;
};

export default MatchList;
