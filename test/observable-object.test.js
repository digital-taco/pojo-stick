const { ObservableObject, createObservedObject } = require('../lib/observable-object')

test('changing a dep=1 value on an ObservableObject fires the observer', () => {
  const observer = jest.fn()
  const obj = new ObservableObject(observer)
  obj.test = true

  expect(observer).toHaveBeenLastCalledWith(true, "test", { test: true })
})

test.todo('changing a dep=x value on an ObservableObject fires the observer')
test.todo('pushing a value to an ObservableObject<array> fires the observer')
test.todo('removing a value from an ObservableObject<array> fires the observer')
test.todo('createObservedObject fire a single observer focused on the root object')
