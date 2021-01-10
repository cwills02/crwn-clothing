import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({title, items }) => {
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>
        {
          items.filter((item, index) => index < 4)
            .map(({id, ...otherItemProps}) => {
            return (
              <CollectionItem key={id} {...otherItemProps
              } />
            )
          })
        }
      </div>
    </div>
  )
}

export default CollectionPreview;

// one thing to keep in mind is that each time the component gets rendered all of the array methods are called each time as well, which becomes important from a performance standpoint if the array is really large