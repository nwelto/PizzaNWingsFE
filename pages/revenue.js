import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import fetchRevenueData from '../API/OrderRevData';

function RevenueDashboard() {
  const [revenueInfo, setRevenueInfo] = useState({
    totalRevenue: 0,
    paidOrdersCount: 0,
    openOrdersCount: 0,
    potentialRevenue: 0,
    lostSales: 0,
    closedOrdersCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRevenueData()
      .then((data) => {
        setRevenueInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography sx={{ color: 'white' }}>Loading...</Typography>;
  if (error) return <Typography sx={{ color: 'white' }}>Error: {error}</Typography>;

  return (
    <div style={{
      color: 'white', textAlign: 'center', marginTop: '20vh', fontSize: '2.5rem',
    }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '4rem' }}>Revenue Summary</Typography>
      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Total Revenue: ${revenueInfo.totalRevenue.toFixed(2)}</Typography>
          <Typography sx={{ fontSize: '1.5rem' }}>Paid Orders Count: {revenueInfo.paidOrdersCount}</Typography>
        </div>
        <div>
          <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Potential Revenue: ${revenueInfo.potentialRevenue.toFixed(2)}</Typography>
          <Typography sx={{ fontSize: '1.5rem' }}>Open Orders Count: {revenueInfo.openOrdersCount}</Typography>
        </div>
        <div>
          <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Lost Sales: ${revenueInfo.lostSales.toFixed(2)}</Typography>
          <Typography sx={{ fontSize: '1.5rem' }}>Closed Orders Count: {revenueInfo.closedOrdersCount}</Typography>
        </div>
      </div>
    </div>
  );
}

export default RevenueDashboard;
