import Vue from 'vue'
const Ctor = Vue.extend()

const identity = (v) => v

export function createInstance(vm, Form, options) {
  const {
    onInit = identity,
    onUpdate = identity,
    dialogProps = {},
    showFooter = true
  } = options
  const instance = new Ctor({
    name: 'create-dialog',
    parent: vm,
    data() {
      return {
        visible: true,
        updateLoading: false,
        initLoading: false,
        model: null,
        disabled: false,
        key: 1,
        dialogProps
      }
    },
    render() {
      return this.onRender()
    },
    methods: {
      onInit(params) {
        this.initLoading = true
        const res = Promise.resolve(onInit(params))

        res
          .then((data) => {
            this.model = data || {}
          })
          .catch((err) => {
            console.log('err', err)
          })
          .finally(() => {
            this.initLoading = false
          })

      },
      onUpdate() {
        this.updateLoading = true
        onUpdate()
        this.updateLoading = false
      },
      onRender() {
        const h = this.$createElement

        return h(
          'el-dialog',
          {
            key: this.key,
            ref: 'dialog',
            props: {
              ...this.dialogProps,
              visible: this.visible
            },
            on: {
              'update:visible': () => {
                this.visible = false
              }
            },
            directives: [
              {
                name: 'loading',
                value: this.initLoading
              }
            ]
          },
          [this.renderBody(), this.renderFooter()]
        )
      },
      renderFooter() {
        const h = this.$createElement

        if (!showFooter) return
        return h(
          'template',
          {
            slot: 'footer'
          },
          [
            h(
              'el-button',
              {
                props: {
                  type: 'plain'
                },
                on: {
                  click: () => {
                    this.visible = false
                  }
                }
              },
              '取消'
            ),
            h(
              'el-button',
              {
                props: {
                  loading: this.updateLoading,
                  disabled: this.disabled,
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.onUpdate()
                  }
                }
              },
              '保存'
            )
          ]
        )
      },
      renderBody() {
        const h = this.$createElement
        const { model } = this
        return h(Form, {
          props: {
            value: model
          },
          on: {
            validate: (valid) => {
              this.disabled = !valid
            },
            input: (model) => {
              this.model = model
            }
          }
        })
      },
      show(params) {
        this.onInit(params)
      },
      close () {
        this.$refs.dialog.hide()
      }
    }
  })

  instance.$mount()
  document.body.appendChild(instance.$el)
  let dialog = instance.$children[0]
  dialog.$once('close', () => {
    instance.$destroy()
    document.body.removeChild(instance.$el)
  })

  return instance
}
