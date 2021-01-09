import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <div 
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        className="background-image"
        style={{
        backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="content">
      <h1 className='title'>{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  )
}

export default withRouter(MenuItem);

// withRouter is a HOC, which means its a function that takes a component as an argument and returns a new component with new properties
// e.g., withRouter() gives us the history, match, and params properties from the react-router-dom library