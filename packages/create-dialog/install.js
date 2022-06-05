let Vue = null

export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue

  applyMixin(Vue)

}

function applyMixin (Vue) {
}