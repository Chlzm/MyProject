import React from '../../lib/react';
import ReactDOM from '../../lib/react-dom';
class HellWord1 extends React.Component{
    constructor(){
        super();
        this.state = {
            name : '1112'
        }
    }
    render(){
        return (
            <div style={{color:'yellow'}}>{this.state.name}{this.props.date.getTime()}</div>
        )
    }
}
setInterval(function() {
    ReactDOM.render(
    <HellWord1 date={new Date()} test="111"/>,
        document.getElementById('example')
    );
}, 1000);