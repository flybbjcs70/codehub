
export function mergeObj (target, ...srcs) {
    for (let i = 0; i < srcs.length; i++) {
      let src = srcs[i]
      for (let key in src) {
        if (target[key] && typeof target[key] === 'object' && src[key] && typeof src[key] === 'object') {
          target[key] = mergeObj({}, target[key], src[key])
        } else {
          target[key] = src[key]
        }
      }
    }
    return target
}
export const loop = function () {}
export const identity = (v) => v


export const defaultOptions = {
  showFooter: true,
  buttons: {
    cancel: '取消',
    update: '保存'
  },
  onInit: identity,
  onUpdate: identity,
  dialogProps: {
    customClass: 'el-dialog-customClass',
    width: '700px',
    title: '提示框',
    closeOnClickModal: false
  },
  responseHander: identity,
  successHandler: identity,
  failHander: identity,
  dialogListeners: {}
}