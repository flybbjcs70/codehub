import { createInstance } from './instance'
import { mergeObj, defaultOptions } from './utils'

export default function factory(namespace = 'dialog', Form, options) {
  return {
    data (vm) {
      return {
        [namespace]: {
          _instance: null,
          show (params) {
            const instance = this._instance = createInstance(vm, Form, mergeObj({}, defaultOptions, options))
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
