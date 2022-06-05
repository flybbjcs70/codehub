"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createInstance;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Ctor = _vue["default"].extend();

var identity = function identity(v) {
  return v;
};

function createInstance(vm, Form, options) {
  var _options$onInit = options.onInit,
      _onInit = _options$onInit === void 0 ? identity : _options$onInit,
      _options$onUpdate = options.onUpdate,
      onUpdate = _options$onUpdate === void 0 ? identity : _options$onUpdate,
      _options$dialogProps = options.dialogProps,
      dialogProps = _options$dialogProps === void 0 ? {} : _options$dialogProps,
      _options$showFooter = options.showFooter,
      showFooter = _options$showFooter === void 0 ? true : _options$showFooter;

  var instance = new Ctor({
    parent: vm,
    data: function data() {
      return {
        visible: false,
        updateLoading: false,
        initLoading: false,
        model: null,
        disabled: false,
        key: 1,
        rendered: false,
        dialogProps: dialogProps
      };
    },
    render: function render() {
      return this.rendered ? this.onRender() : null;
    },
    methods: {
      onInit: function onInit(params) {
        var _this = this;

        this.initLoading = true;
        var res = Promise.resolve(_onInit(params));
        res.then(function (data) {
          _this.model = data || {};
        })["catch"](function (err) {
          console.log('err', err);
        })["finally"](function () {
          _this.initLoading = false;
        });
      },
      onRender: function onRender() {
        var _this2 = this;

        var h = this.$createElement;
        return h('el-dialog', {
          key: this.key,
          props: _objectSpread({}, this.dialogProps, {
            visible: this.visible
          }),
          on: {
            'update:visible': function updateVisible() {
              _this2.visible = false;
            }
          },
          directives: [{
            name: 'loading',
            value: this.initLoading
          }]
        }, [this.renderBody(), this.renderFooter()]);
      },
      renderFooter: function renderFooter() {
        var _this3 = this;

        var showFooter = this.showFooter;
        var h = this.$createElement;
        if (!showFooter) return;
        return h('template', {
          slot: 'footer'
        }, [h('el-button', {
          props: {
            type: 'plain'
          },
          on: {
            click: function click() {
              _this3.visible = false;
            }
          }
        }, '取消'), h('el-button', {
          props: {
            loading: this.updateLoading,
            disabled: this.disabled,
            type: 'primary'
          },
          on: {
            click: function click() {
              return regeneratorRuntime.async(function click$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _this3.save();

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }
          }
        }, '保存')]);
      },
      renderBody: function renderBody() {
        var _this4 = this;

        var h = this.$createElement;
        var model = this.model;
        return h(Form, {
          props: {
            value: model
          },
          on: {
            validate: function validate(valid) {
              _this4.disabled = !valid;
            },
            input: function input(model) {
              _this4.model = model;
            }
          }
        });
      },
      show: function show(params) {
        this.onInit(params);
      }
    }
  });
}