import { Modal } from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

const images = [
  "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
  "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
  "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
]

export default class DocAppImageViewer extends React.Component {


    constructor(props){
        super(props);
        this.state={
            visible: true,
            setVisible: true
        }
    }

    render() {
        return (
            <Modal visible={true} transparent={true} onRequestClose={() => { this.state.visible(false) } }>
                <ImageViewer imageUrls={images}/>
            </Modal>
        )
    }
}