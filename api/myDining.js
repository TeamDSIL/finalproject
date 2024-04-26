import { instance } from './index';

function test(test) {
  return instance.post('signup', test);
}


export {  };