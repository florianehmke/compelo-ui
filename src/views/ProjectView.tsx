import React from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';
import CreateGame from '../components/CreateGame';
import PlayerList from '../components/PlayerList';
import CreatePlayer from '../components/CreatePlayer';

const ProjectView = () => {
  const { projectId } = useParams();
  const parsedProjectId = parseInt(projectId ?? '0', 10);

  return parsedProjectId !== 0 ? (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-md-6'}>
          <CreateGame projectId={parsedProjectId} />
          <GameList projectId={parsedProjectId} />
        </div>
        <div className={'col-md-6'}>
          <CreatePlayer projectId={parsedProjectId} />
          <PlayerList projectId={parsedProjectId} />
        </div>
      </div>
    </div>
  ) : null;
};

export default ProjectView;
