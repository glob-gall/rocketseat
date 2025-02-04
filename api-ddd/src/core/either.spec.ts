import { Either, left, right } from './either'

function doSomething(sholdSuccess: boolean): Either<string, string> {
  if (sholdSuccess) {
    return right('success')
  } else {
    return left('error')
  }
}

test('success', () => {
  const result = doSomething(true)

  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})

test('error', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toEqual(true)
  expect(result.isRight()).toEqual(false)
})
