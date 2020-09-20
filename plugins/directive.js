import Vue from "vue"

function autoSize() {
  this.style.height = "auto"
  const rect = this.getBoundingClientRect()
  if (rect.height < this.scrollHeight) {
    this.style.height = `${this.scrollHeight}px`
  }
}

Vue.directive("autosize", {
  bind (el) {
    el.style.resize = "none"
    el.addEventListener("input", autoSize)
    el.addEventListener("change", autoSize)
  },
  inserted (el) {
    autoSize.bind(el)()
  },
  componentUpdated (el) {
    autoSize.bind(el)()
  },
  unbind (el) {
    el.removeEventListener("input", autoSize)
    el.removeEventListener("change", autoSize)
  }
})
