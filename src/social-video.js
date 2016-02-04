import React, {Component, PropTypes} from 'react';

export default class SocialVideo extends Component {
  static propTypes = {
    service: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired
  };

  parseYoutubeURL (url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    let result;
    if (match && match[7].length === 11) {
      result = match[7];
    } else {
      result = false;
    }
    return result;
  }

  parseVimeoURL (url) {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const match = regExp.exec(url);
    let result;
    if (match && match[5].length === 9) {
      result = match[5];
    } else {
      result = false;
    }
    return result;
  }

  parseDailymotionURL (url) {
    const regExp = /^.+dailymotion.com\/((video|hub)\/([^_]+))?[^#]*(#video=([^_&]+))?/;
    const match = url.match(regExp);
    let result;
    if (match && match.length > 2) {
      result = match[5] || match[3];
    } else {
      result = false;
    }
    return result;
  }

  render() {
    const {service, video, ...htmlTags} = this.props;

    let src = '';
    if (this.props.service === 'youtube') {
      const parsedID = this.parseYoutubeURL(this.props.video);
      src = 'http://www.youtube.com/embed/' + (parsedID || this.props.video);
    } else if (this.props.service === 'vimeo') {
      const parsedID = this.parseVimeoURL(this.props.video);
      src = 'http://player.vimeo.com/video/' + (parsedID || this.props.video);
    } else if (this.props.service === 'dailymotion') {
      const parsedID = this.parseDailymotionURL(this.props.video);
      src = 'http://www.dailymotion.com/embed/video/' + (parsedID || this.props.video);
    }

    return (
      <iframe
        src={src}
        frameBorder='0'
        webkitAllowFullScreen
        mozallowfullscreen
        allowFullScreen
        {...htmlTags}
      />
    );
  }
}
