import * as utils from "~/lib/utils"

describe("utils lib", () => {

  it("setObjectKeysValue function", () => {

    const tab = {
      'test': [],
      'test2': []
    }
    expect(utils.setObjectKeysValue(tab, [])).toEqual({'test': [], 'test2': []})
    tab.test = ["error1", "error2"]
    expect(utils.setObjectKeysValue(tab, [])).toEqual({'test': [], 'test2': []})

    expect(utils.setObjectKeysValue(tab, "random")).toEqual({'test': "random", 'test2': "random"})

  })
})
