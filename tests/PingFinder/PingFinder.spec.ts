import { expect } from "chai";
import { PingFinder } from "../../src/services/ping-finder"

describe('PingFinder', () => {
  let service : PingFinder;

  beforeEach(()=>{
      service = new PingFinder();
  })

  it("shoud find ping in the string",()=>{
      expect(service.isPing("ping")).to.be.true
  })
})
