import React from 'react';
import ReactDOM from 'reactDom';
import $ from 'jquery';
let Test = React.createClass({
    propTypes : {
        title : React.PropTypes.string.isRequired
    },
    getInitialState(){
        return {
            show : false
        }
    },
    handlerClick(){
        var show = !this.state.show;
        this.setState({
            show : show
        });
        this.refs.myTextInput.focus();
    },
    render(){
        return(
            <div onClick={this.handlerClick}>
                <ol>
                    {
                        React.Children.map(this.props.children,(children)=>{
                            return <li>{children}{this.props.title}</li>
                        })
                    }
                </ol>
                <input type="text" ref="myTextInput"/>
            </div>
        );
    }
});
let ChangeInput = React.createClass({
    getInitialState(){
        return {
            value : 'hello!!'
        }
    },
    handlerChange(event){
        this.setState({
            value : event.target.value
        })
    },
    render(){
        return (
            <div>
                <Test title="你好">
                    <span>1</span>
                    <span>2</span>
                </Test>
                <input type="text" value={this.state.value} onChange={this.handlerChange}/>
                <p>{this.state.value}</p>
            </div>
        )
    }
});
ReactDOM.render(
    <ChangeInput/>,
    document.getElementById('example')
);
export class Point {
    say (){
        console.log(Object.is(null,null));
    }
};;