import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { PingFinder } from "../../src/services/ping-finder";
import { MessageResponder } from "../../src/services/message-responder";
import { instance, mock, verify, when } from "ts-mockito";
import { Message } from "discord.js";

describe('MessageResponder', () => {
  let mockedPingFinderClass:PingFinder;
  let mockedPingFinderInstance:PingFinder;
  let mockedMessageClass: Message;
  let mockedMessageInstance: Message;

  let service :MessageResponder;

  beforeEach(()=>{
      mockedPingFinderClass = mock(PingFinder);
      mockedPingFinderInstance = instance(mockedPingFinderClass);
      mockedMessageClass = mock(Message)
      mockedMessageInstance = instance(mockedMessageClass);
      setMessageContents();

      service = new MessageResponder(mockedPingFinderInstance);
  })

  it('should reply', async ()=>{
      whenIsPingThenReturn(true);

      await service.handle(mockedMessageInstance);

      verify(mockedMessageClass.reply('pong!')).once();
  })

  it('Should not reply', async ()=>{
      whenIsPingThenReturn(false);

      await service.handle(mockedMessageInstance).then(()=>{
          expect.fail('Unexpected Promise')
      }).catch(()=>{

      })

      verify(mockedMessageClass.reply("pong!")).never();
  })

  function setMessageContents() {
      mockedMessageInstance.content = "Non-empty String";
  }

  function whenIsPingThenReturn(result:boolean) {
      when(mockedPingFinderClass.isPing("Non-empty String")).thenReturn(result)
  }
})
