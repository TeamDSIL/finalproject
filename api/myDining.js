// instance 임폴트!!
import { instance } from './index';

// reply를 받아서 todos/ 로 post 방식으로 reply 를 보냄
function registerReply(reply) {
  return instance.post('todos', reply);
}

function getReserveList(id) {
  return instance.get('myDining/'+id)
}

// vue page에서 사용하기위해 메소드 export
export { registerReply };