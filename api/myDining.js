import { instance } from './index';

function registerReply(reply) {
  return instance.post('todos', reply);
}


export { registerReply };