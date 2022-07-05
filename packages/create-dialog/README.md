# A mixin of el-dialog that close to business scenarios

## Install

```js
 npm install @zewen/create-dialog
 
 yan add @zewen/create-dialog
```

## Step1
### gloabl options handler setting

```js
import Vue from 'vue'
import createDialog from '@zewen/create-dialog'

Vue.use(createDialog, {
  responseHander (res) {
    if(res.success) {
      return 'save success'
    }
    throw new Error(res && res.message || 'failed')
  },
  successHandler (message) {
    Vue.prototype.$message({type: 'success', message: message})
  },
  failHandler (reason) {
    Vue.prototype.$message({type: 'error', message: reason && reason.message || reason})
  }
})

```

## Step2

```js
import createDialog from '@zewen/create-dialog'
import Form from './Form'
export default {
  mixins: [
    createDialog('dialog', Form, {
      async onInit (initParams, vm) {
        // request api data or initParams
        // return await getInitData(initParams).then(res => res.data)
        // return initParams
      },
      onUpdate (data, vm) {
        return updateData(data)
      },
      dialogProps: {}, // el-dialog props
      dialogListeners: {} // el-dialog listeners
    })
  ],
  methods: {
    showDialog (initParams) {
      this.dialog.show(initParams)
    }
  }
}

```

## type

```ts
function createDialog(namespace:string, Form: VueComponentOptions | VueConstructor, Options): {
  data () {
    return [namespace]{
      show(data:object):void,
      close():void
    }
  }
}

interface Options = {
  showFooter:boolean,
  buttons: {
    cancel: string,
    update: string
  },
  onInit: function,
  onUpdate: function,
  closeOnUpdateSuccess: boolean,
  dialogProps: {
    customClass: string,
    width: string,
    title: string,
    closeOnClickModal: boolean,
    [key:string]:any
  },
  responseHander: function,
  successHandler: function,
  failHander: function,
  dialogListeners: object
}

```

## Form

| 参数  | 类型   |
|-------|--------|
| value | object |
|       |        |



| emit事件 | 类型    |
|----------|---------|
| validate | boolean |
