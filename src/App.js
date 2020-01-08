import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';

// const app = new Clarifai.App({
//   apiKey: '1a7d387892754496b6a248fe467261a7'
// });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }

  }
};
const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signout',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }

    })
  }

  findFaceLocation = (data) => {
    

    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    let facesArray = []
    clarifaiFace.forEach(face => {
      let box = face.region_info.bounding_box;
        facesArray.push({
          leftCol: box.left_col * width,
          topRow: box.top_row * height,
          rightCol: width - (box.right_col * width),
          bottomRow: height - (box.bottom_row * height)
        })
    });

    return facesArray;

  }

  displayFaceBox = (faces) => {
    // console.log(faces);

    this.setState({boxes: faces});
    // console.log(this.state.boxes, 'kakakakaka');
  }
  
  onUserInput = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://obscure-journey-03789.herokuapp.com/imageurl/', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            input: this.state.input
        })
      })

      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://obscure-journey-03789.herokuapp.com/image/', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
        })
          .catch(console.log)
      }
      this.displayFaceBox( (this.findFaceLocation(response)) )

      })
    .catch(err => console.log(err))
    }  

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }


  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles 
          params={particlesOptions}
          className='particles' 
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onUserInput={this.onUserInput} 
              onButtonSubmit={this.onSubmit}
              input={this.state.input}
            />
            <FaceRecognition boxes={boxes} selectedImage={imageUrl} />
          </div>
          :
          (
            route === 'signin' || route === 'signout' ?
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
