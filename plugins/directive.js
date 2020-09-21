import Vue from "vue"

function autoSize() {
  this.style.height = "auto"
  this.style.height = `${this.scrollHeight}px`
}

Vue.directive("autosize", {
  bind (el) {
    el.style.resize = "none"
    el.addEventListener("input", autoSize)
  },
  inserted (el) {
    autoSize.bind(el)()
  },
  unbind (el) {
    el.removeEventListener("input", autoSize)
  }
})
