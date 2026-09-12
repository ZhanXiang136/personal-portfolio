import React from 'react';

export default function StockTradingAI() {
  return (
    <div style={{ height: '100vh', margin: 0, padding: 0, backgroundColor: 'white' }}>
      <iframe
        src="https://stocktradingai.netlify.app"
        title="Stock Trading AI"
        sandbox="allow-scripts allow-same-origin allow-forms"
        referrerPolicy="no-referrer"
        allow="camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'"
        width="100%"
        height="100%"
        style={{
          border: 'none',
          margin: 0,
          padding: 0,
        }}
      />
    </div>
  );
}
