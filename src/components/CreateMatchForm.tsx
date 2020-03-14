import { useMutation, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as React from 'react';
import { useState } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import PlayerSelect from '../controls/PlayerSelect';
import { PLAYERS_SUBSCRIPTION } from '../shared/gql/players-subscription';
import {
  InsertMatchMutation,
  InsertMatchMutationVariables,
  Player,
  PlayersSubscription,
  PlayersSubscriptionVariables,
  Result_Type_Enum,
  Team_Insert_Input,
} from '../types/generated/graphql';

const INSERT_MATCH = gql`
  mutation InsertMatch(
    $match: match_insert_input!
    $teams: [team_insert_input!]!
  ) {
    insert_match(objects: [$match]) {
      affected_rows
    }

    insert_team(objects: $teams) {
      affected_rows
    }
  }
`;

interface FormData {
  teams: {
    players: {
      player: Player;
    }[];
    score: string;
  }[];
}

type Props = {
  gameId: number;
  projectId: number;
};

const CreateMatchForm = (props: Props) => {
  const [addMatch] = useMutation<
    InsertMatchMutation,
    InsertMatchMutationVariables
  >(INSERT_MATCH);

  const playerData = useSubscription<
    PlayersSubscription,
    PlayersSubscriptionVariables
  >(PLAYERS_SUBSCRIPTION, { variables: { projectId: props.projectId } });

  const [valid, setValid] = useState(false);
  const form = useForm();

  const onChange = () => form.triggerValidation().then(setValid);
  const onSubmit = (data: any) =>
    addMatch({
      variables: toMatchMutationVariables(data, props.gameId),
    }) as any;

  return (
    <div className={'container border shadow mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Create Match</h5>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'row'}>
            <div className={'col-md-4'} onClick={onChange} onKeyUp={onChange}>
              <PlayerSelect
                name={'teams[0].players'}
                required={true}
                players={playerData.data?.player ?? []}
              />
            </div>
            <div className={'col-md-2'}>
              <input
                name={'teams[0].score'}
                onChange={onChange}
                className={'form-control'}
                type="number"
                ref={form.register({ required: 'Required' })}
              />
            </div>
            <div className={'col-md-2'}>
              <input
                name={'teams[1].score'}
                onChange={onChange}
                className={'form-control'}
                type="number"
                ref={form.register({ required: 'Required' })}
              />
            </div>
            <div className={'col-md-4'} onClick={onChange} onKeyUp={onChange}>
              <PlayerSelect
                name={'teams[1].players'}
                required={true}
                players={playerData.data?.player ?? []}
              />
            </div>
          </div>
          {valid ? (
            <div className={'d-flex justify-content-center mt-3'}>
              <button className={'btn btn-success w-25'} type="submit">
                Add Match
              </button>
            </div>
          ) : null}
        </form>
      </FormContext>
    </div>
  );
};

const toMatchMutationVariables = (
  formData: FormData,
  gameId: number,
): InsertMatchMutationVariables => {
  const uuid = uuidv4();

  const teams = formData.teams.map(
    ({ score, players }) =>
      ({
        score: parseInt(score, 10),
        match_uuid: uuid,
        result: Result_Type_Enum.Draw,
        appearances: {
          data: players
            .map(value => value.player.id)
            .map(player_id => ({ player_id })),
        },
      } as Team_Insert_Input),
  );

  const highScore = teams
    .map(team => team.score ?? 0)
    .reduce((a, b) => Math.max(a, b));

  const lowestScore = teams
    .map(team => team.score ?? 0)
    .reduce((a, b) => Math.min(a, b));

  if (lowestScore !== highScore) {
    teams.forEach(
      team =>
        (team.result =
          team.score === highScore
            ? Result_Type_Enum.Win
            : Result_Type_Enum.Loss),
    );
  }

  return {
    match: { uuid, game_id: gameId },
    teams: teams,
  };
};

export default CreateMatchForm;
