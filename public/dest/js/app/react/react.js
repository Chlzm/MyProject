define(['../../lib/react', '../../lib/react-dom'], function (_react, _reactDom) {
    'use strict';

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var HellWord1 = function (_React$Component) {
        _inherits(HellWord1, _React$Component);

        function HellWord1() {
            _classCallCheck(this, HellWord1);

            var _this = _possibleConstructorReturn(this, _React$Component.call(this));

            _this.state = {
                name: '1112'
            };
            return _this;
        }

        HellWord1.prototype.render = function render() {
            return _react2.default.createElement(
                'div',
                { style: { color: 'yellow' } },
                this.state.name,
                this.props.date.getTime()
            );
        };

        return HellWord1;
    }(_react2.default.Component);

    setInterval(function () {
        _reactDom2.default.render(_react2.default.createElement(HellWord1, { date: new Date(), test: '111' }), document.getElementById('example'));
    }, 1000);
});