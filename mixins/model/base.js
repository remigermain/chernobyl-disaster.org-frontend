import { toFlatObject } from "~/lib/utils"

export default {

  methods: {
    toFormData (data) {
      const form = new FormData()

      for (const [key, value] of Object.entries(toFlatObject(data))) {
        if (value !== undefined && value !== null) {
          form.append(key, value)
        }
      }

      return form
    }
  }

}
