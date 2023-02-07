import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// index reducer를 추가하는 이유는
// redux server side rendering 에 hydrate를 추가하기 위해서다.
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
