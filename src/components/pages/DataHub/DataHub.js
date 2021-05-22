import React, { useState, useEffect } from 'react';
import './DataHub.less';
import Plot from 'react-plotly.js';
import axios from 'axios';

const DataHub = props => {
  const { caseData, authState } = props;
  const [vizData, setVizData] = useState({});

  const data = caseData;

  useEffect(() => {
    axios
      .get('http://localhost:8080/judges/2/cases', {
        headers: {
          Authorization: 'Bearer ' + authState.idToken.idToken,
        },
      })
      .then(res => {
        console.log(res.data.judge_cases);
        setVizData(res.data.judge_cases);
      });
  }, []);

  const TestDataChart = () => {
    return <Plot data={vizData.data} layout={vizData.layout} />;
  };

  const CaseDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
        terminated += 1;
      }
      return null;
    });

    return (
      <Plot
        data={[
          {
            type: 'bar',
            x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
            y: [granted, denied, remanded, sustained, terminated],
          },
        ]}
        layout={{ width: 500, height: 300, title: 'Case Data' }}
      />
    );
  };

  const MainDataChart = () => {
    let denied = 0;
    let granted = 0;
    let remanded = 0;
    let sustained = 0;
    let terminated = 0;

    data.map(eachCase => {
      if (eachCase.case_outcome === 'Denied') {
        denied += 1;
      }
      if (eachCase.case_outcome === 'Granted') {
        granted += 1;
      }
      if (eachCase.case_outcome === 'Remanded') {
        remanded += 1;
      }
      if (eachCase.case_outcome === 'Sustained') {
        sustained += 1;
      }
      if (eachCase.case_outcome === 'Terminated') {
        terminated += 1;
      }
      return null;
    });

    return (
      <Plot
        data={[
          {
            type: 'bar',
            x: ['Granted', 'Denied', 'Remanded', 'Sustained', 'Terminated'],
            y: [granted, denied, remanded, sustained, terminated],
          },
        ]}
        layout={{ width: 1100, height: 400, title: 'Case Data' }}
      />
    );
  };

  return (
    <div className="dataHubContainer">
      <div className="mainChartContainer">
        <TestDataChart />
      </div>

      <div className="subChartsContainer">
        <CaseDataChart />
        <CaseDataChart />
      </div>
    </div>
  );
};

export default DataHub;
