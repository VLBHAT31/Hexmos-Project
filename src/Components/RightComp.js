import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

function RightComp({ id }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    const apiUrl = `http://127.0.0.1:8000/polls/get_poll_details/${id}/`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        processChartData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const processChartData = data => {
    const { OptionVote } = data;
    const chartData = [['Choice', 'Votes'], ...Object.entries(OptionVote)];
    setChartData(chartData);
  };

  const chartOptions = {
    chartArea: { width: '90%', height: '90%' },
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', marginLeft: '660px',marginTop: '50px' }}>
        {chartData.length > 0 ? (
          <Chart chartType="PieChart" data={chartData} options={chartOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <div style={{ flex: '1' }}>
        
        
      </div>
    </div>
  );
}

export default RightComp;

