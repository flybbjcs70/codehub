const identity = (v) => v

const opt = {}
export function createInstance(Vue, vm, Form, options) {
  const {
    onInit = identity,
    onUpdate = identity,
    dialogProps = {},
    dialogListeners = {},
    showFooter = true,
    responseHander = identity,
    successHandler = identity,
    failHandler = identity,
    buttons = {}
  } = options
  const Ctor = Vue.extend(opt)

  const instance = new Ctor({
    name: 'create-dialog',
    parent: vm,
    created() {
      this.dialogOptions = options
    },
    data() {
      return {
        visible: false,
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
        this.visible = true

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
        Promise.resolve(onUpdate({ ...this.model }))
          .then(responseHander)
          .then(successHandler, failHandler)
          .finally(() => {
            this.updateLoading = false
          })
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
              ...dialogListeners,
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
            buttons['cancel']
              ? h(
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
                  buttons['cancel']
                )
              : null,
            buttons['update']
              ? h(
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
                  buttons['update']
                )
              : null
          ]
        )
      },
      renderBody() {
        const h = this.$createElement
        const { model } = this
        return h(Form, {
          props: {
            value: model,
            $$updateLoading: this.updateLoading,
            $$disabled: this.disabled,
            $$update: this.onUpdate,
            $$close: this.close
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
      close() {
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
