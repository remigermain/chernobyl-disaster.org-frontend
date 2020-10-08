import * as contrib from "~/lib/contribute"

describe("contribute lib", () => {

  it("generateUrl function", () => {

    expect(contrib.generateUrl("model")).toEqual("model/?contribute=true")
    expect(contrib.generateUrl("model", 5)).toEqual("model/?contribute=true&page=5")
    expect(contrib.generateUrl("model", 5, "la")).toEqual("model/?contribute=true&page=5&search=la")
    expect(contrib.generateUrl("model", null, "la")).toEqual("model/?contribute=true&search=la")
    expect(contrib.generateUrl("model", null, "la", true)).toEqual("model/?contribute=true&search=la&completed=true")
    expect(contrib.generateUrl("model", null, "la", false)).toEqual("model/?contribute=true&search=la&completed=false")
    expect(contrib.generateUrl("model", null, null, true)).toEqual("model/?contribute=true&completed=true")
    expect(contrib.generateUrl("model", 99, null, true)).toEqual("model/?contribute=true&page=99&completed=true")
    expect(contrib.generateUrl("model", 99, null, true)).toEqual("model/?contribute=true&page=99&completed=true")

  })

it("convert date function", () => {
    let data = {
      date: '1971-01-01T07:38:18.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, seconds: 18, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:18.000Z',
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:18.000Z',
      have_second: false,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:48.000Z',
      have_second: true,
      have_minute: false,
      have_hour: false,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, seconds: 48})

    data = {
      date: '1971-01-01T00:00:00.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, seconds: 0, minutes: 0, hours: 0})

    data = {
      date: '1971-01-01T00:59:59.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, seconds: 59, minutes: 59, hours: 0})

    data = {
      date: '1971-01-01T23:59:59.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertDate(data)).toEqual({date: data.date, seconds: 59, minutes: 59, hours: 23})
  })
})
