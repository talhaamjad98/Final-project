import React from 'react';

const FormResponse = ({ response, sentData }) => {
  if (!response) return null;

  return (
    <div className="response-container">
      <h3>Submission Successful!</h3>
      <div className="response-grid">
        <div className="response-section">
          <h4>Data Sent:</h4>
          <pre>{JSON.stringify(sentData, null, 2)}</pre>
        </div>
        <div className="response-section">
          <h4>Server Response (httpbin):</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default FormResponse;
