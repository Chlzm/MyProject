let HelloWorld = React.createClass({
    render: function() {
        return (
        <div>
        Hello1, <input type="text" placeholder="Your name here" />!
                It is {this.props.date.toTimeString()}
        </div>
        );
    }
});
setInterval(function() {
    ReactDOM.render(
    <HelloWorld date={new Date()} />,
        document.getElementById('example')
    );
}, 500);