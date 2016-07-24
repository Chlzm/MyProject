define(['react', 'reactDom', 'jquery'], function (_react, _reactDom, _jquery) {
    

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var exampleMixin = {
        componentWillMount: function componentWillMount() {
            console.log("will");
        },
        componentDidMount: function componentDidMount() {
            console.log("did1");
        }
    };
    var Father = _react2.default.createClass({
        displayName: 'Father',

        mixins: [exampleMixin],
        getDefaultProps: function getDefaultProps() {
            return {
                items: ["华为", "苹果", "三星3"]
            };
        },
        getInitialState: function getInitialState() {
            return {
                address: '安徽'
            };
        },
        changeState: function changeState(value) {
            this.setState({
                address: value
            });
        },
        render: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    '我是父集:',
                    this.state.address
                ),
                _react2.default.createElement(Son, { change: this.changeState, items: this.props.items })
            );
        }
    });
    var Son = _react2.default.createClass({
        displayName: 'Son',
        getInitialState: function getInitialState() {
            return {
                address: '北京',
                height: (0, _jquery2.default)(window).height()
            };
        },
        changeAddress: function changeAddress() {
            this.props.change(this.state.address);
        },
        render: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    null,
                    this.props.items.map(function (item, i) {
                        return _react2.default.createElement(
                            'li',
                            { 'data-key': i, id: i },
                            item
                        );
                    })
                ),
                _react2.default.createElement(
                    'span',
                    { onClick: this.changeAddress },
                    '我是子集1：',
                    this.state.address,
                    '-',
                    this.state.height
                )
            );
        }
    });
    _reactDom2.default.render(_react2.default.createElement(Father, null), document.getElementById('example'));
});