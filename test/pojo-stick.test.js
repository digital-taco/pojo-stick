const { resolve } = require('path')
const { readFile, mkdir, rmdir, interpret} = require('../lib/file-safe')
const pojoStick = require('../index')

const testDir = resolve('.', 'test/data') // this is git ignored

async function clearTestDir () {
  await rmdir(testDir, { recursive: true })
  await mkdir(testDir, { recursive: true })
}

const wait = (time = 0) => new Promise(res => setTimeout(res, time))

beforeAll(() => {
  return clearTestDir();
});

afterAll(() => {
  return clearTestDir();
});

test.todo('pojoStick() with no args should throw')
test.todo('pojoStick(<storage-path>) should return an empty object')
test.todo('pojoStick(<storage-path>, <initialData>) should return a copy of the initial data param')

test('changing the returned object should reflect to filesystem', async () => {
  const obj = await pojoStick(testDir)

  const read1 = interpret(await readFile(resolve(testDir, '.pojo-stick.json')))
  expect(read1).toEqual({})
  
  obj.test = { this: { is: { a: { successful: { test: false } } } } }
  
  await wait() // for file to sync
  
  const read2 = interpret(await readFile(resolve(testDir, '.pojo-stick.json')))
  expect(read2.test).toEqual(obj.test)
})