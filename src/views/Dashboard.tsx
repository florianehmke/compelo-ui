import React from 'react';

import CreateProject from '../components/CreateProject';
import InfoBox from '../components/InfoBox';
import ProjectList from '../components/ProjectList';

const Dashboard = () => {
  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-md-6'}>
          <InfoBox />
        </div>
        <div className={'col-md-6'}>
          <CreateProject />
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
