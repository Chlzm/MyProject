import React from 'react';
import ReactDOM from 'reactDom';
import $ from 'jquery';
let exampleMixin = {
    componentWillMount(){
        console.log("will");
    },
    componentDidMount(){
        console.log("did1");
    }
};
let Father = React.createClass({
    mixins : [exampleMixin],
    getDefaultProps (){
        return {
            items : ["华为","苹果","三星3"]
        }
    },
    getInitialState (){
        return {
            address: '安徽'
        }
    },
    changeState(value){
        this.setState({
            address : value
        });
    },
    render (){
        return (
            <div>
                <h1>我是父集:{this.state.address}</h1>
                <Son change={this.changeState} items={this.props.items}/>
            </div>
        )
    }
});
let Son = React.createClass({
    getInitialState(){
        return {
            address : '北京',
            height : $(window).height()
        }
    },
    changeAddress(){
        this.props.change(this.state.address);
    },
    render(){
        return (
            <div>
                <ul>
                    {
                        this.props.items.map(function(item,i){
                            return (
                                <li data-key={i} id={}>{item}</li>
                            )
                        })
                    }
                </ul>
                <span onClick={this.changeAddress}>我是子集1：{this.state.address}-{this.state.height}</span>
            </div>
        )
    }
});
ReactDOM.render(
    <Father/>,
    document.getElementById('example')
);