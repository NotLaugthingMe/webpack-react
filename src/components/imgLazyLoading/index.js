/**
 * Created by chenlin on 2018/2/24 0024.
 */
import React from 'react';
import classNames from 'classnames';
export default class ImgLazyLoading extends React.Component{
  state = {
    imgUrl: null
  };
  static defaultProps = {
    url: ''
  };
  componentDidMount() {
    const {url} = this.props;
    if (url) {
      let image = new Image();
      image.onload = () =>{
        this.setState({
          imgUrl: url
        }, ()=>{
          image = null;
        });
      };
      image.src = url;
    }
  }
  render() {
    const {imgUrl} = this.state;
    return (
      <div className="lazy">
        {!imgUrl ? <div className="lazy-loading">
        </div> : <img src={imgUrl} alt=""/>}
      </div>
    );
  }
}
