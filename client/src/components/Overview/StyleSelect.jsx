import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import ProductInfo from './ProductInfo.jsx';
import GalleryImg from './GalleryImg.jsx';
import Default_Expanded from './Def-Expanded.jsx';
import { Checkmark } from 'react-checkmark';

//test the bold for SALES PRICE
// change the icon for selective icon - need to research more

function StyleSelect (props) {
  const [styles, setStyles] = useState([])
  const [thumbnail, setThumbnail] = useState([])
  const [defaultStyle, setDefaultStyle] = useState({})
  const [thumbClick, setThumbClick] = useState(false)
  const [defaultPhoto, setDefaultPhoto] = useState('')
  // index is for photo index
  const [indexPhoto, setIndexPhoto] = useState(0);

  useEffect(() => {
    if (props.data !== undefined) {
      axios.get(`/api/styles/${props.data}`)
        .then((results) => setStyles(results.data.results))
        .catch((err) => console.error(err))
    }
  }, [props.data])

  useEffect(() => {
    var res = [];
    {styles.map((item, index) => {
      if (item['default?']) {
        setDefaultStyle(item)
      }
      item.photos.map((item, index) => {
        if (index === 0) {
          res.push(item)
          setThumbnail(res)
        }
      })
    })}
  }, [styles])

  useEffect(() => {
    if (Object.keys(defaultStyle).length > 0) {
      setDefaultPhoto(defaultStyle.photos[0].url)
    }
  }, [defaultStyle])

  const thumbnailModel = (array) => {
    var result = [];
    var finalRes = [];

    for (var i = 0; i < array.length; i++) {
      if (result.length === 4) {
        finalRes.push(result)
        result = [];
        result.push(array[i])
      } else if (i === array.length - 1) {
        array[i].index = i
        result.push(array[i]);
        finalRes.push(result);
      } else {
        array[i].index = i
        result.push(array[i]);
      }
    }

    return finalRes;
  }

  const clickThumbnail = (ind, newPhoto) => {
    setDefaultPhoto(newPhoto)
    var newStyle = styles[ind]
    setDefaultStyle(newStyle);
    setIndexPhoto(0)
  }

  return (
    <div id ="whole-Style">
      <Default_Expanded default={defaultPhoto} setDefault={setDefaultPhoto} style={defaultStyle} index={indexPhoto} setIndex={setIndexPhoto} allStyle={thumbnail} />
      <div id="Style-Select">
        <div className="category-rating" style={{margin: '1.5%', justifyContent: 'center', display: 'flex'}}>
         Color:&nbsp;<b>{defaultStyle.name}</b>
        </div>
      {thumbnailModel(thumbnail).map((itemA, index) => (
        <div key={index} style={{justifyContent: 'center', display: 'flex'}}>
        {itemA.map((item, index) => (
          <img src={item.thumbnail_url} key={index} className="thumbnail-img" style={defaultStyle.photos[0].thumbnail_url === item.thumbnail_url ? {border: '3px solid red'} : null} onClick={() => clickThumbnail(item.index, item.url)}></img>
        ))}
        </div>
      ))}
      {defaultStyle.sale_price === null ? <div style={{margin: '1.5%', fontSize: '19px', justifyContent: 'center', display: 'flex'}}> $ {defaultStyle.original_price} </div> : <div style={{margin: '1.5%', fontSize:'19px', justifyContent: 'center', display: 'flex'}}> <b style={{color:'red', weight: '600'}}>${defaultStyle.sale_price}</b><strike> $ {defaultStyle.original_price} </strike> </div> }
      <GalleryImg default={defaultStyle} setDefaultPhoto={setDefaultPhoto} setIndex={setIndexPhoto} index={indexPhoto} />
      <ProductInfo default={defaultStyle} />
    </div>
    </div>
  )
}

export default StyleSelect

// checkmark icon -- learn css to place onto selected image
{/* <i class="fa fa-check text-white"></i> */}