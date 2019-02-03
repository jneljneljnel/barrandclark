Object.defineProperty(exports, "__esModule", {
  value: !0
}

),
exports.Accordion=void 0;
var _extends=Object.assign||function(e) {
  for(var t=1;
  t<arguments.length;
  t++) {
      var r=arguments[t];
      for(var n in r)Object.prototype.hasOwnProperty.call(r, n)&&(e[n]=r[n])
  }
  return e
}

,
_jsxFileName="node_modules/native-base/src/basic/Accordion.js",
_createClass=function() {
  function e(e, t) {
      for(var r=0;
      r<t.length;
      r++) {
          var n=t[r];
          n.enumerable=n.enumerable||!1,
          n.configurable=!0,
          "value"in n&&(n.writable=!0),
          Object.defineProperty(e, n.key, n)
      }
  }
  return function(t, r, n) {
      return r&&e(t.prototype, r),
      n&&e(t, n),
      t
  }
}

(),
_react=require("react"),
_react2=_interopRequireDefault(_react),
_reactNative=require("react-native"),
_Text=require("../../node_modules/native-base/dist/src/basic/Text"),
_Icon=require("../../node_modules/native-base/dist/src/basic/Icon"),
_platform=require("../../node_modules/native-base/dist/src/theme/variables/platform"),
_platform2=_interopRequireDefault(_platform);
function _interopRequireDefault(e) {
  return e&&e.__esModule?e: {
      default: e
  }
}

function _classCallCheck(e, t) {
  if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
  if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return!t||"object"!=typeof t&&"function"!=typeof t?e: t
}

function _inherits(e, t) {
  if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);
  e.prototype=Object.create(t&&t.prototype, {
      constructor: {
          value: e, enumerable: !1, writable: !0, configurable: !0
      }
  }
  ),
  t&&(Object.setPrototypeOf?Object.setPrototypeOf(e, t):e.__proto__=t)
}

var DefaultHeader=function(e) {
  function t() {
      return _classCallCheck(this, t),
      _possibleConstructorReturn(this, (t.__proto__||Object.getPrototypeOf(t)).apply(this, arguments))
  }
  return _inherits(t, _react2.default.Component),
  _createClass(t, [ {
      key:"render", value:function() {
          var e=this.context.theme?this.context.theme["@@shoutem.theme/themeStyle"].variables: _platform2.default;
          return _react2.default.createElement(_reactNative.View, {
              style:[styles.defaultHeader, this.props.headerStyle?this.props.headerStyle: {
                  backgroundColor: e.headerStyle
              }
              ], __source: {
                  fileName: _jsxFileName, lineNumber: 19
              }
          }
          , _react2.default.createElement(_Text.Text, {
              __source: {
                  fileName: _jsxFileName, lineNumber: 27
              }
          }
          , " ", this.props.title), _react2.default.createElement(_Icon.Icon, {
              style:[ {
                  fontSize: 18
              }
              , this.props.expanded?this.props.expandedIcon&&this.props.expandedIconStyle?this.props.expandedIconStyle: {
                  color: e.expandedIconStyle
              }
              :this.props.icon&&this.props.iconStyle?this.props.iconStyle: {
                  color: e.iconStyle
              }
              ], name:this.props.expanded?this.props.expandedIcon?this.props.expandedIcon:"ios-arrow-up":this.props.icon?this.props.icon:"ios-arrow-down", __source: {
                  fileName: _jsxFileName, lineNumber: 28
              }
          }
          ))
      }
  }
  ]),
  t
}

(),
DefaultContent=function(e) {
  function t() {
      return _classCallCheck(this, t),
      _possibleConstructorReturn(this, (t.__proto__||Object.getPrototypeOf(t)).apply(this, arguments))
  }
  return _inherits(t, _react2.default.Component),
  _createClass(t, [ {
      key:"render", value:function() {
          var e=this.context.theme?this.context.theme["@@shoutem.theme/themeStyle"].variables: _platform2.default;
          return _react2.default.createElement(_Text.Text, {
              style:[ {
                  padding: 10
              }
              , this.props.contentStyle?this.props.contentStyle: {
                  backgroundColor: e.contentStyle
              }
              ], __source: {
                  fileName: _jsxFileName, lineNumber: 60
              }
          }
          , this.props.content)
      }
  }
  ]),
  t
}

(),
AccordionSubItem=function(e) {
  function t() {
      var e,
      r,
      n;
      _classCallCheck(this, t);
      for(var o=arguments.length, a=Array(o), i=0;
      i<o;
      i++)a[i]=arguments[i];
      return r=n=_possibleConstructorReturn(this, (e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))),
      n.state= {
          fadeAnim: new _reactNative.Animated.Value(.3)
      }
      ,
      _possibleConstructorReturn(n, r)
  }
  return _inherits(t, _react2.default.Component),
  _createClass(t, [ {
      key:"componentDidMount", value:function() {
          _reactNative.Animated.timing(this.state.fadeAnim, {
              toValue: 1, duration: 500
          }
          ).start()
      }
  }
  , {
      key:"render", value:function() {
          var e=this.state.fadeAnim;
          return _react2.default.createElement(_reactNative.Animated.View, {
              style:_extends( {}
              , this.props.style, {
                  opacity: e
              }
              ), __source: {
                  fileName: _jsxFileName, lineNumber: 87
              }
          }
          , this.props.children)
      }
  }
  ]),
  t
}

(),
AccordionItem=function(e) {
  function t() {
      return _classCallCheck(this, t),
      _possibleConstructorReturn(this, (t.__proto__||Object.getPrototypeOf(t)).apply(this, arguments))
  }
  return _inherits(t, _react2.default.Component),
  _createClass(t, [ {
      key:"render", value:function() {
          var e=this;
          return _react2.default.createElement(_reactNative.View, {
              __source: {
                  fileName: _jsxFileName, lineNumber: 97
              }
          }
          , _react2.default.createElement(_reactNative.TouchableWithoutFeedback, {
              onPress:function() {
                  return e.props.setSelected(e.props.index)
              }
              , __source: {
                  fileName: _jsxFileName, lineNumber: 98
              }
          }
          , _react2.default.createElement(_reactNative.View, {
              __source: {
                  fileName: _jsxFileName, lineNumber: 101
              }
          }
          , this.props.renderHeader?this.props.renderHeader(this.props.item, this.props.expanded):_react2.default.createElement(DefaultHeader, {
              title:this.props.item.title, expanded:this.props.expanded, headerStyle:this.props.headerStyle, icon:this.props.icon, iconStyle:this.props.iconStyle, expandedIcon:this.props.expandedIcon, expandedIconStyle:this.props.expandedIconStyle, __source: {
                  fileName: _jsxFileName, lineNumber: 105
              }
          }
          ))), this.props.expanded?_react2.default.createElement(AccordionSubItem, {
              __source: {
                  fileName: _jsxFileName, lineNumber: 118
              }
          }
          , this.props.renderContent?this.props.renderContent(this.props.item):_react2.default.createElement(DefaultContent, {
              content:this.props.item.content, contentStyle:this.props.contentStyle, __source: {
                  fileName: _jsxFileName, lineNumber: 122
              }
          }
          )):null)
      }
  }
  ]),
  t
}

(),
Accordion=exports.Accordion=function(e) {
  function t() {
      var e,
      r,
      n;
      _classCallCheck(this, t);
      for(var o=arguments.length, a=Array(o), i=0;
      i<o;
      i++)a[i]=arguments[i];
      return r=n=_possibleConstructorReturn(this, (e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))),
      n.state= {
          selected: void 0
      }
      ,
      _possibleConstructorReturn(n, r)
  }
  return _inherits(t, _react2.default.Component),
  _createClass(t, [ {
      key:"setSelected", value:function(e) {
          this.state.selected===e?this.setState( {
              selected: void 0
          }
          ):this.setState( {
              selected: e
          }
          )
          console.log('selected '+this.state.selected)
      }
  }
  , {
      key:"componentDidMount", value:function() {
          this.setState( {
              selected: this.props.expanded
          }
          )
      }
  }
  , {
      key:"componentWillReceiveProps", value:function(nextProps) {
          if (this.props.expanded !== nextProps.expanded) {
              if(isNaN(nextProps.expanded)){
                      this.setState({selected: false});
                  }else{
                      this.setState({selected: nextProps.expanded});
                  }
          }else{}
      }
  }
  , {
      key:"render", value:function() {
          var e=this, t=this.state.selected, r=this.context.theme?this.context.theme["@@shoutem.theme/themeStyle"].variables: _platform2.default;
          return _react2.default.createElement(_reactNative.FlatList, _extends( {
              data:this.props.dataArray, extraData:this.state, style:[ {
                  borderColor: r.accordionBorderColor, borderWidth: r.borderWidth
              }
              , this.props.style], keyExtractor:function(e, t) {
                  return String(t)
              }
              , renderItem:function(r) {
                  var n=r.item, o=r.index;
                  return _react2.default.createElement(AccordionItem, {
                      key:String(o), item:n, expanded:t===o, index:o, setSelected:e.setSelected.bind(e),  headerStyle:e.props.headerStyle, contentStyle:e.props.contentStyle, renderHeader:e.props.renderHeader, renderContent:e.props.renderContent, icon:e.props.icon, iconStyle:e.props.iconStyle, expandedIcon:e.props.expandedIcon, expandedIconStyle:e.props.expandedIconStyle, __source: {
                          fileName: _jsxFileName, lineNumber: 165
                      }
                  }
                  )
              }
          }
          , this.props, {
              __source: {
                  fileName: _jsxFileName, lineNumber: 153
              }
          }
          ))
      }
  }
  ]),
  t
}

(),
styles=_reactNative.StyleSheet.create( {
  defaultHeader: {
      flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center"
  }
}

);
