import FAB from './fab.vue'
import FABItem from './fab-item.vue'
import FABCantainer from './fab-cantainer.vue'
import { testSafariBrower } from './util'

function install (Vue, options) {
  if (options && options.iconType) {
    FAB.props.iconType.default = options.iconType
  }
  Vue.component(FAB.name, FAB)
  Vue.component(FABItem.name, FABItem)
  Vue.component(FABCantainer.name, FABCantainer)
  Vue.directive('click-outside', {
    bind: (el, binding, vnode) => {
      const listenClick = (e) => {
        if (el.contains(e.target) || e.target.dataset.outside) {
          return false
        }
        binding.value()
      }
      el.__clickOutside__ = listenClick
      // 处理safari浏览器body对象无法响应click事件
      if (testSafariBrower()) {
        let html = document.querySelector('html')
        html.setAttribute('class', 'setCursor')
        html.addEventListener('click', listenClick)
      } else {
        window.addEventListener('click', listenClick)
      }
    },
    unbind: (el, binding) => {
      if (testSafariBrower()) {
        document.removeEventListener('click', el.__clickOutside__)
      } else {
        document.querySelector('html').removeEventListener('click', el.__clickOutside__)
      }
    }
  })
}

module.exports = install
