import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( { onUserInput, onButtonSubmit, input } ) => {
    return ( 
        <div>
            <p className='f3'>
                {'find the face:'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onUserInput}/>
                    <button 
                        className={input === '' ? 'w-30 f4 link ph3 pv2 dib white bg-light-grey' : 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'}
                        onClick={onButtonSubmit}
                        disabled={input === '' ? true : false}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;