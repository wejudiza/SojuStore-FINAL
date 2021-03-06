/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import React from 'react';

function StyleSelect(props) {
  const thumbnailModel = (array) => {
    let result = [];
    const finalRes = [];

    for (let i = 0; i < array.length; i++) {
      if (result.length === 4) {
        array[i].index = i;
        finalRes.push(result);
        result = [];
        result.push(array[i]);
      } else if (i === array.length - 1) {
        array[i].index = i;
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i;
        result.push(array[i]);
      }
    }

    return finalRes;
  };

  const clickThumbnail = (ind, newPhoto) => {
    props.setPhoto(newPhoto);
    const newStyle = props.style[ind];
    props.setDefault(newStyle);
    props.setIndex(0);
    props.setReset(['Select Size']);
  };

  return (
    <div id="whole-Style">
      <div className="container">
        <div
          className="category-rating"
          style={{
            margin: '1.5%', display: 'flex', order: '1', alignSelf: 'flex-end',
          }}
        >
          Color:&nbsp;
          <b>{props.defaultStyle.name}</b>
        </div>
        {thumbnailModel(props.thumbnail).map((itemA, index) => (
          <div
            key={index}
            style={{
              justifyContent: 'center', display: 'flex', width: '100%', order: '2', alignSelf: 'flex-end',
            }}
          >
            {itemA.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                {' '}
                { props.defaultStyle.photos[0].thumbnail_url === null ? null : props.defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? (
                  <i
                    style={{
                      position: 'absolute', top: '6%', color: 'whitesmoke', backgroundColor: 'midnightblue', borderRadius: '50% 50%',
                    }}
                    className="fa fa-check"
                    aria-hidden="true"
                  />
                ) : null}
                <img src={item.thumbnail_url === null ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png' : item.thumbnail_url} className="thumbnail-img" style={props.defaultStyle.photos[0].thumbnail_url === null ? null : props.defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? { border: '1.5px solid lightsteelblue', boxShadow: '1.5px 1px 2px 0.5px lightsteelblue' } : null} onClick={() => clickThumbnail(item.index, item.url)} alt="thumbnail"/>
              </div>
            ))}
          </div>
        ))}
        {props.defaultStyle.sale_price === null ? (
          <div style={{
            margin: '1.5%', fontSize: '34px', width: '100%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end',
          }}
          >
            {' '}
            $
            {' '}
            {props.defaultStyle.original_price}
          </div>
        ) : (
          <div style={{
            margin: '1.5%', fontSize: '34px', width: '100%', display: 'flex', order: '3', justifyContent: 'center', alignSelf: 'flex-end',
          }}
          >
            <b style={{ color: 'red', weight: '600' }}>
              $
              {props.defaultStyle.sale_price}
            </b>
            <strike>
              {' '}
              $
              {' '}
              {props.defaultStyle.original_price}
              {' '}
            </strike>
          </div>
        )}
      </div>
    </div>
  );
}

export default StyleSelect;
