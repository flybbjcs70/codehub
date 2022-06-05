
export let Vue = null

export default function install(_Vue) {
  if (Vue && _Vue === Vue) {
    return
  }
  Vue = _Vue

}
