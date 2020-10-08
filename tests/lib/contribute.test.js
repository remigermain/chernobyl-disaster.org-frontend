import * as contri from "~/lib/contribute"

describe("contribute lib", () => {

  it("generateUrl function", () => {

    expect(contri.generateUrl("model")).toEqual("model/?contribute=true")
    expect(contri.generateUrl("model", 5)).toEqual("model/?contribute=true&page=5")
    expect(contri.generateUrl("model", 5, "la")).toEqual("model/?contribute=true&page=5&search=la")
    expect(contri.generateUrl("model", null, "la")).toEqual("model/?contribute=true&search=la")
    expect(contri.generateUrl("model", null, "la", true)).toEqual("model/?contribute=true&search=la&completed=true")
    expect(contri.generateUrl("model", null, "la", false)).toEqual("model/?contribute=true&search=la&completed=false")
    expect(contri.generateUrl("model", null, null, true)).toEqual("model/?contribute=true&completed=true")
    expect(contri.generateUrl("model", 99, null, true)).toEqual("model/?contribute=true&page=99&completed=true")
    expect(contri.generateUrl("model", 99, null, true)).toEqual("model/?contribute=true&page=99&completed=true")

  })
})
