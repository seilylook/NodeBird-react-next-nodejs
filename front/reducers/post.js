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
  postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: 'ADD_POST',
};

const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 1,
    nickname: 'kim se hyeon',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};

export default reducer;
