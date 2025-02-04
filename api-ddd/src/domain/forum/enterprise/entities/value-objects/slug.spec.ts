import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('  SimPLE SLug  --!@#$%¨&*()_+  ')

  expect(slug.value).toEqual('simple-slug')
})
