import React, { Component } from 'react'
import { Video } from 'expo-av';
import { Container } from 'native-base';

export default class VideoView extends Component {
    render() {
        return (
            <Container>
                    <Video
                        ref={ref => {this.video = ref}}
                        source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay={this.state.shouldPlay}
                        isLooping
                        usePoster
                        style={{ width: width, height: 290 }}
                      />
            </Container>
        )
    }
}
