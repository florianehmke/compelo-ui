import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { Player } from '../types/generated/graphql';

export interface SelectOption {
  value: number;
  label: string;
}

type Props = {
  name: string;
  required: boolean;
  players: Partial<Player>[];
};

const PlayerSelect = (props: Props) => {
  const { control } = useFormContext();

  const options: SelectOption[] = props.players
    .filter(player => player.id !== undefined && player.name !== undefined)
    .map(player => ({
      value: player.id!,
      label: player.name!,
      player
    }));

  return (
    <Controller
      name={props.name}
      as={
        <Select
          isMulti
          options={options}
          className={'compelo-select'}
          classNamePrefix={'compelo-select'}
        />
      }
      rules={{ required: props.required ? 'Required' : false }}
      control={control}
    />
  );
};

export default PlayerSelect;
