import { timelineElement } from '../lib/timeline'
import { sanitizeHtml, removeHtml } from '../lib/sanitize'

describe('timeline element lib', () => {
  const list = [
    {
      slug: 'slug1'
    },
    {
      slug: 'slug2'
    },
    {
      slug: 'slug3'
    }
  ]

  it('invalid slug', () => {
    expect(timelineElement(list, 'invalid-slug')).toBeTruthy()
  })

  it('no slug', () => {
    expect(timelineElement(list)).toBeTruthy()
  })

  it('with slug', () => {
    expect(timelineElement(list, 'slug2')).toMatchObject({ slug: 'slug2' })
  })

  it('sanitze html', () => {
    expect(sanitizeHtml('<p>tests</p>')).toEqual('<p>tests</p>')
    expect(sanitizeHtml('<p>tests</p><script>ll</script>')).toEqual(
      '<p>tests</p>'
    )
  })

  it('sanitze html', () => {
    expect(removeHtml('<p>tests</p>')).toEqual('tests')
    expect(removeHtml('<p>tes<span>ininini</span>ts</p>')).toEqual(
      'tesinininits'
    )
  })
})
