// 액션 타입(문자열)
const LOGIN = 'triplogr/LOGIN';
const LOGOUT = 'triplogr/LOGOUT';
const ADD_PLAN_DATE = 'triplog/ADD_PLAN_DATE';
const ADD_PLAN_ITEM = 'triplog/ADD_PLAN_ITEM';
const SET_DATE_IDX = 'triplog/SET_DATE_IDX';
const DELETE_PLAN_ITEM = 'triplog/DELETE_PLAN_ITEM';

// 로그인, 로그아웃 액션 생성 함수
export function login(loginInfo) {
  return {
    type: LOGIN,
    payload: loginInfo,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function addPlanDate(planDate) {
  return {
    type: ADD_PLAN_DATE,
    payload: planDate,
  };
}

export function addPlanItems(planItems) {
  return {
    type: ADD_PLAN_ITEM,
    payload: planItems,
  };
}

export function setDateIdx(idx) {
  return {
    type: SET_DATE_IDX,
    payload: idx,
  };
}

export function deletePlanItem(deleteItemObj) {
  return {
    type: DELETE_PLAN_ITEM,
    payload: deleteItemObj,
  }
}

// 초기 상태 설정
const initState = {
  user: '',
  isLogin: true, //로그인 끝내고 false로 바꾸기
  planDate: {
    startDate: '',
    endDate: '',
    period: [],
  },
  // 10.30 상황에 맞게 2중 배열을 만들기 위해 변경
  planItems: [],
  planDateIdx: 0,
  list: [],
};

// 리듀서
export default function triplog(state = initState, action) {
  switch (action.type) {
    // login 함수가 dipatch 에 의해 전달 되면 백엔드 서로 부터 받은 email, nickname 정보를 세팅하고
    // 제일 중요한 isLogin 값을 true 로 변경, 해당 값은 Header 및 Item 페이지에서 로그인 여부를 판단하는
    // 값이 되어 해당 값에 따라 조건부 처리
    case LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isLogin: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case ADD_PLAN_DATE:
      return {
        ...state,
        planDate: action.payload,
      };
    case ADD_PLAN_ITEM:
      // 10.30 state 값에 바로 배열 처리를 하면 mutation 에러 발생
      // 해당 값을 받아줄 dummy 데이터 생성
      let dummyItem = {};
      dummyItem.planItems = [];

      // period 의 길이 만큼 배열이 생성 되면 되므로 for 문으로 배열 만들기
      // 이전 데이터는 그대로 있어야 하므로 기존 데이터의 값이 존재 하면 그대로 넣어주기

      for (let i = 0; i < state.planDate.period.length; i++) {
        if (state.planItems[i] !== undefined) {
          dummyItem.planItems.push(state.planItems[i]);
        } else {
          dummyItem.planItems.push([]);
        }
      }
      // 새롭게 들어온 데이터를 넣어주기!
      dummyItem.planItems[action.payload.idx] = action.payload.copy;

      return {
        ...state,
        planItems: dummyItem.planItems,
      };
    case SET_DATE_IDX:
      console.log('idx', action.payload);
      return {
        ...state,
        planDateIdx: action.payload,
      };
    case DELETE_PLAN_ITEM:
      const deleteIdx = state.planItems[action.payload.idx].findIndex(e => e.title === action.payload.title);
      console.log("배열", state.planItems[action.payload.idx]);
      console.log("딜리트", deleteIdx);
      state.planItems[action.payload.idx].splice(deleteIdx, 1);
      return {
        ...state,
      }
    default:
      return state;
  }
}
