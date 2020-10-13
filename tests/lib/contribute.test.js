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
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, seconds: 18, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:18.000Z',
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:18.000Z',
      have_second: false,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, minutes: 38, hours: 7})

    data = {
      date: '1971-01-01T07:38:48.000Z',
      have_second: true,
      have_minute: false,
      have_hour: false,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, seconds: 48})

    data = {
      date: '1971-01-01T00:00:00.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, seconds: 0, minutes: 0, hours: 0})

    data = {
      date: '1971-01-01T00:59:59.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, seconds: 59, minutes: 59, hours: 0})

    data = {
      date: '1971-01-01T23:59:59.000Z',
      have_second: true,
      have_minute: true,
      have_hour: true,
    }
    expect(contrib.convertFromDate(data)).toEqual({date: data.date, seconds: 59, minutes: 59, hours: 23})
  })

  it("convert date function", () => {
      let data = {
        date: '1971-01-01T00:00:00.000Z',
        seconds: 12,
        minutes: 33,
        hours: 12,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T12:33:12.000Z', have_second: true, have_minute: true, have_hour: true})

      data = {
        date: '1971-01-01T00:00:00.000Z',
        hours: 12,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T12:00:00.000Z', have_second: false, have_minute: false, have_hour: true})

      data = {
        date: '1971-01-01T00:00:00.000Z',
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T00:00:00.000Z', have_second: false, have_minute: false, have_hour: false})

      data = {
        date: '1971-01-01T00:00:00.000Z',
        seconds: 59,
        minutes: 59,
        hours: 23,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T23:59:59.000Z', have_second: true, have_minute: true, have_hour: true})

      data = {
        date: '1971-01-01T00:00:00.000Z',
        seconds: 59,
        minutes: 59,
        hours: 11,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T11:59:59.000Z', have_second: true, have_minute: true, have_hour: true})

      data = {
        date: '1971-01-01T00:00:00.000Z',
        seconds: 59,
        minutes: 59,
        hours: 13,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T13:59:59.000Z', have_second: true, have_minute: true, have_hour: true})

      data = {
        date: '1971-01-01T00:01:01.000Z',
        seconds: 1,
        minutes: 1,
        hours: 0,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T00:01:01.000Z', have_second: true, have_minute: true, have_hour: true})

      data = {
        date: '',
        seconds: 1,
        minutes: 1,
        hours: 0,
      }
      expect(contrib.convertToDate(data)).toEqual({date: null, have_second: false, have_minute: false, have_hour: false})

      data = {
        date: '1971-01-01T12:23:01.000Z',
        seconds: 25,
      }
      expect(contrib.convertToDate(data)).toEqual({date: '1971-01-01T00:00:25.000Z', have_second: true, have_minute: true, have_hour: true})
  })

  it("convert tags function", () => {
    let data = [
      {
        display_name: "test",
        value: 4
      },
      {
        display_name: "ttest",
        value: 5
      },
      {
        display_name: "tttest",
        value: -1
      },
    ]
    expect(contrib.convertToTags(data)).toEqual([{name: "test", id: 4}, {name: "ttest", id: 5}, {name: "tttest"}])

    data = [
      {
        display_name: "test",
        value: 4
      }
    ]
    expect(contrib.convertToTags(data)).toEqual([{name: "test", id: 4}])

    data = [
      {
        display_name: "test",
        value: -1
      }
    ]
    expect(contrib.convertToTags(data)).toEqual([{name: "test"}])
  })

})
