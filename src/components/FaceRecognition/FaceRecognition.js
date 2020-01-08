import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ selectedImage, boxes }) => {
    return ( 
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={selectedImage} width='auto' height='300px'></img>
                {
                    boxes.map(box => {
                        return <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} key={boxes.indexOf(box)}></div>
                    })
                } 
            </div>
        </div>
    )
}

// 
export default FaceRecognition;