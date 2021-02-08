import React from 'react';

const Header = (props) => {

	return(
    <div id="header-global">
      <h4>{props.header}</h4>
    </div>
  );
  
}

export default Header;