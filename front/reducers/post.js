// 나중에 DB에서 데이터를 받아올 때
// sequelize를 통한 참조 관계 데이터는 대문자로 변수명 설정
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'seilylook',
      },
      content: '첫 번째 게시글 #해시태크 #익스프레스',
      Images: [
        {
          src: 'https://cdn.pixabay.com/photo/2018/02/02/23/27/office-3126597__480.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2018/02/02/22/49/still-life-3126536__480.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/11/06/11/49/texture-2923443__480.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'seilylook',
          },
          content: 'I am the king of javascript',
        },
        {
          User: {
            nickname: 'jsking',
          },
          content: 'I am the king of Python',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: 'kim se hyeon',
  },
  content: 'dummy data',
  Images: [],
  Comments: [],
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };

    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
