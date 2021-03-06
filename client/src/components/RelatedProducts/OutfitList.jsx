import React from 'react';
import axios from 'axios';
import OutfitCard from './OutfitCard.jsx';
import Whirligig from 'react-whirligig';

/// Carousel buttons///
let whirligig
  const next = () => whirligig.next()
  const prev = () => whirligig.prev()

class OutfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitList: [],
    };
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }


  addToOutfit() {
    if (localStorage.outfitList) {
      var isFound = JSON.parse(localStorage.outfitList).find((outfit) => (
        outfit.id === this.props.mainProduct.id
      ))
    } else {
      var isFound = this.state.outfitList.find((outfit) => (
        outfit.id === this.props.mainProduct.id
      ))
    }
    if (isFound === undefined) {
      this.setState({
        outfitList: this.state.outfitList.concat(this.props.mainProduct)
      })
      if (localStorage.outfitList === undefined) {
        localStorage.setItem('outfitList', JSON.stringify(this.state.outfitList.concat(this.props.mainProduct)))
      } else {
        const outfits = JSON.parse(localStorage.outfitList)
        localStorage.setItem('outfitList', JSON.stringify(outfits.concat(this.props.mainProduct)))
      }
    }
  }

  removeProduct(product) {
    this.setState({
      outfitList: this.state.outfitList.filter((outfitItem) => (
        product.id !== outfitItem.id
      ))
    })
    const outfits = JSON.parse(localStorage.outfitList)
    var filtered = outfits.filter((outfitItem) => (
      product.id !== outfitItem.id
    ))
    localStorage.setItem('outfitList', JSON.stringify(filtered))
  }


  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}} className="outfit-container" onClick={(e) => this.props.click(e, this.props.widget)}>
        <i className={localStorage.outfitList !== undefined && JSON.parse(localStorage.outfitList).length > 3 ?
        "fas fa-arrow-circle-left fa-2x prev" : "fas fa-arrow-circle-left fa-2x prev hidden"
        } onClick={prev}></i>
        <Whirligig
        ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
        slideClass={"slide"}
        slideBy={1 || 0}
        gutter="6.4em"
        preventScroll={true}>
        <div className="add-card">
          <h4 className="add">Add to Outfit</h4>
          <i className="fas fa-plus fa-3x btn" onClick={this.addToOutfit}></i>
          </div>
          {localStorage.outfitList !== undefined ?
            JSON.parse(localStorage.outfitList).map((outfitItem, index) => {
              return (
                <div className="outfit-card" key={index}>
                  <OutfitCard outfitItem={outfitItem} mainProduct={this.props.mainProduct} removeProduct={this.removeProduct}/>
                </div>
              )
            }): null
          }
          </Whirligig>
          <div>
          <i className={localStorage.outfitList !== undefined && JSON.parse(localStorage.outfitList).length > 3 ?
            "fas fa-arrow-circle-right fa-2x next" : "fas fa-arrow-circle-right fa-2x next hidden"
            } onClick={next}></i>
            </div>
      </div>
    );
  }
}

export default OutfitList;
