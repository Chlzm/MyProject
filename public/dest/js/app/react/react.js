define(['exports', 'react', 'reactDom', 'jquery'], function (exports, _react, _reactDom, _jquery) {
    

    exports.__esModule = true;
    exports.Point = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Test = _react2.default.createClass({
        displayName: 'Test',

        propTypes: {
            title: _react2.default.PropTypes.string.isRequired
        },
        getInitialState: function getInitialState() {
            return {
                show: false
            };
        },
        handlerClick: function handlerClick() {
            var show = !this.state.show;
            this.setState({
                show: show
            });
            this.refs.myTextInput.focus();
        },
        render: function render() {
            var _this = this;

            return _react2.default.createElement(
                'div',
                { onClick: this.handlerClick },
                _react2.default.createElement(
                    'ol',
                    null,
                    _react2.default.Children.map(this.props.children, function (children) {
                        return _react2.default.createElement(
                            'li',
                            null,
                            children,
                            _this.props.title
                        );
                    })
                ),
                _react2.default.createElement('input', { type: 'text', ref: 'myTextInput' })
            );
        }
    });
    var ChangeInput = _react2.default.createClass({
        displayName: 'ChangeInput',
        getInitialState: function getInitialState() {
            return {
                value: 'hello!!'
            };
        },
        handlerChange: function handlerChange(event) {
            this.setState({
                value: event.target.value
            });
        },
        render: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    Test,
                    { title: '你好' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '1'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '2'
                    )
                ),
                _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handlerChange }),
                _react2.default.createElement(
                    'p',
                    null,
                    this.state.value
                )
            );
        }
    });
    _reactDom2.default.render(_react2.default.createElement(ChangeInput, null), document.getElementById('example'));

    var Point = exports.Point = function () {
        function Point() {
            _classCallCheck(this, Point);
        }

        Point.prototype.say = function say() {
            console.log(Object.is(null, null));
        };

        return Point;
    }();

    ;;
});