import React from 'react';
import { useHistory } from "react-router-dom";
import Button from 'antd/lib/button';

const Page = (props) => {

  const history = useHistory();
  
  const navigate = () => {
    history.push('/home');
  }

	return(
    <div id="page">
      <div id="page-container">
        <h1 className="page-text">Welcome to Mantis</h1>
        <h2 className="page-text">Leverage on Aave</h2>
        <Button id="page-button" onClick={navigate}><span id="button-text">Go to App</span></Button>
      </div>
    </div>
  );
  
}

export default Page;