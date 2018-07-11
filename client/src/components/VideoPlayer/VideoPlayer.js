import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './VideoPlayer.css';

class VideoPlayer extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="videoPlayer-container">
                <ReactPlayer url='https://www.youtube.com/watch?v=jvo86AHovFc'  />
                {/* <ReactPlayer url='https://www.youtube.com/watch?v=jvo86AHovFc' playing /> */}
            </div>
        )
    }
}

export default VideoPlayer;