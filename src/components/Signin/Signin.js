import React from 'react';

class Signin extends React.Component {
    constructor() {
        super();
        this.state = {
            signInMail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInMail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmit = () => {
        fetch('https://obscure-journey-03789.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInMail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })

    }

    render(){
        const { onRouteChange } = this.props;
    
        return ( 
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">    
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                />
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={ this.onSubmit }/>
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" className="f6 link dim black db pointer" onClick={ ()=> onRouteChange('register')}>Register</p>
                        </div>
                        {this.signInFail? <label className="db fw6 lh-copy f6 red">Email or password incorrect!</label> : ''}
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;