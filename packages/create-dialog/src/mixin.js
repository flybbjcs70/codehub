import { createInstance } from './instance'
import { mergeObj, defaultOptions } from './utils'
let _Vue = null

let custonOptions = {}
export default function factory(namespace = 'dialog', Form, options) {
  return {
    data (vm) {
      return {
        [namespace]: {
          _instance: null,
          show (params) {
            const instance = this._instance = createInstance(_Vue, vm, Form, mergeObj({}, defaultOptions, custonOptions, options))
            instance.show(params)
          },
          close () {
            this._instance && this._instance.close()
            this._instance = null
          }
        }
      }
    }
  }
}
factory.install = install

function install (Vue, options) {
  if(_Vue && Vue === Vue) return
  _Vue = Vue

  custonOptions = mergeObj({}, options)

}

