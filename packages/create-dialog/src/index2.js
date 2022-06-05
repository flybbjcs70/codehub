import Vue from 'vue'
import { 
    mergeObj, 
    showMsg,
    loop
} from './utils'


let Ctr = Vue.extend()


const defaultOptions = {
  showBtn: true,
  showRemove: false,
  hideOnSuccess: true,
  saveBtnText: '保存',
  api: {
    init: loop,
    update: loop
  },
  onSuccess: loop,
  onShow: loop,
  props: {
    customClass: 'el-dialog-customClass',
    width: '700px',
    title: '',
    closeOnClickModal: false
  }
}

function factory (name = 'dialog', {
  Form,
  api = {
    init: loop,
    update: loop
  },
  options = {}
}) {
  return {
    data (vm) {
      return {
        [name]: {
          renderDialog () {
            let h = vm.$createElement
            let formVNode = h(Form, {
              props: {
                $loading: this.saveLoading,
                $disabled: this.disabled,
                $save: this.save.bind(this),
                $hide: this.hide.bind(this),
                value: this.model
              },
              on: {
                validate: (v) => {
                  this.disabled = !v
                },
                input: (model) => {
                  this.model = model
                }
              },
              directives: [
                {
                  name: 'loading',
                  value: this.dataLoading
                }
              ]
            })
            return h('el-dialog', {
              key: this.key,
              props: {
                ...this.options.props,
                visible: this.visible
              },
              on: {
                'update:visible': () => {
                  this.visible = false
                }
              }
            }, [
              formVNode,
              this.options.showBtn ? h('template', {
                slot: 'footer'
              }, [
                h('el-button', {
                  props: {
                    type: 'plain'
                  },
                  on: {
                    click: () => {
                      this.visible = false
                    }
                  }
                }, '取消'),
                h('el-button', {
                  props: {
                    loading: this.saveLoading,
                    disabled: this.disabled,
                    type: 'primary'
                  },
                  on: {
                    click: async () => {
                      let ret = this.validate(formVNode.componentInstance)
                      ret && this.save()
                    }
                  }
                }, this.options.saveBtnText)
              ]) : null
            ])
          },
          validate () {
            return true
          },
          hide () {
            this.visible = false
          },
          render () {
            let _vm = new Ctr({
              parent: vm,
              render: () => {
                return this.renderDialog()
              }
            })
            _vm.$mount()
            document.body.appendChild(_vm.$el)
            let dialog = _vm.$children[0]
            dialog.$once('close', () => {
              _vm.$destroy()
              document.body.removeChild(_vm.$el)
            })
          },
          visible: false,
          loading: false,
          saveLoading: false,
          removeLoading: false,
          dataLoading: false,
          disabled: false,
          key: 1,
          options: mergeObj({}, defaultOptions, options),
          model: {
          },
          async initModel (data = {}) {
            if (api.init !== loop && api.init) {
              this.dataLoading = true
              let res = await api.init(data, vm)
              this.dataLoading = false
              this.model = res
            } else {
              this.model = data
            }
          },
          async save () {
            this.saveLoading = true
            let res = await api.update({
              ...this.model
            }, vm).catch(ex => ex)
            res.success && showMsg('保存成功', 'success')
            !res.success && showMsg((res.errorDetail || res.errorDetail.message) || '网络错误', 'error')
            this.saveLoading = false
            res.success && this.options.hideOnSuccess && (this.visible = false)
            res.success && this.options.onSuccess && this.options.onSuccess(vm, this.model)
          },
          refresh () {
            this.key++
          },
          show (data, props = {}) {
            this.options.props = mergeObj({}, this.options.props, props)
            this.initModel(data)
            this.visible = true
            this.render()
          }
        }
      }
    }
  }
}
export default factory
