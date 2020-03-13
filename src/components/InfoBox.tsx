import * as React from 'react';

const InfoBox = () => {
  return (
    <div className={'container shadow border mt-3 p-3'}>
      <h5 className={'mb-3 border-bottom'}>Welcome</h5>
      <ol>
        <li>Select (or create) a project.</li>
        <li>Select (or create) a game, add missing players.</li>
        <li>Track played games and player ratings.</li>
      </ol>
    </div>
  );
};

export default InfoBox;
