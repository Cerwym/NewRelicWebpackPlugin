/**
 * Dummy test
 */
import { NewrelicWebpackPlugin } from '../src/newrelicwebpackplugin'


describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new NewrelicWebpackPlugin()).toBeInstanceOf(NewrelicWebpackPlugin)
  })
})
