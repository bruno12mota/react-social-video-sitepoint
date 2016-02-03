import React, { Component } from 'react';

import SocialVideo from './social-video';

var videos = [
  {
    provider: 'youtube',
    video: 'https://www.youtube.com/watch?v=XxVg_s8xAms'
  },
  {
    provider: 'youtube',
    video: 'XuZLtMrCOoU'
  },
  {
    provider: 'vimeo',
    video: 'https://vimeo.com/151715092'
  },
  {
    provider: 'vimeo',
    video: '148177148'
  },
  {
    provider: 'dailymotion',
    video: 'http://www.dailymotion.com/video/x3oc771_la-voiture-du-futur_tech'
  },
  {
    provider: 'dailymotion',
    video: 'x3p6f0f_long-story-short-teaser-saison-2_tech'
  }
];

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      video: 0
    };
  }

  previousVideo (event) {
    event.preventDefault();
    if (this.state.video === 0) {
      this.setState({
        video: videos.length - 1
      });
    } else {
      this.setState({
        video: this.state.video - 1
      });
    }
  }

  nextVideo (event) {
    event.preventDefault();
    if (this.state.video === videos.length - 1) {
      this.setState({
        video: 0
      });
    } else {
      this.setState({
        video: this.state.video + 1
      });
    }
  }

  render() {
    const {provider, video} = videos[this.state.video];
    return (
      <div>
        <SocialVideo provider={provider} video={video} width={500} height={270} />
        <p>
          <span>{provider}: </span>
          <span>{video}</span>
        </p>
        <a href='#' onClick={this.previousVideo.bind(this)}>Previous</a>
        <a href='#' onClick={this.nextVideo.bind(this)}>Next</a>
      </div>
    );
  }
}
