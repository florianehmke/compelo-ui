import React from 'react';
import { useParams } from 'react-router-dom';

import CreateMatchForm from '../components/CreateMatchForm';
import Leaderboard from '../components/Leaderboard';
import MatchList from '../components/MatchList';

const GameView = () => {
  const { gameId, projectId } = useParams();
  const parsedGameId = parseInt(gameId ?? '0', 10);
  const parsedProjectId = parseInt(projectId ?? '0', 10);

  return parsedGameId !== 0 ? (
    <div className={'container'}>
      <CreateMatchForm gameId={parsedGameId} projectId={parsedProjectId} />
      <div className={'row'}>
        <div className={'col-md-6'}>
          <MatchList gameId={parsedGameId} />
        </div>
        <div className={'col-md-6'}>
          <Leaderboard gameId={parsedGameId} />
        </div>
      </div>
    </div>
  ) : null;
};

export default GameView;
