export { default as Datatable } from '../..\\components\\Datatable.vue'
export { default as DataTableClasses } from '../..\\components\\DataTableClasses.vue'
export { default as DatatableStudents } from '../..\\components\\DatatableStudents.vue'
export { default as SendMessage } from '../..\\components\\SendMessage.vue'
export { default as SideBar } from '../..\\components\\SideBar.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
