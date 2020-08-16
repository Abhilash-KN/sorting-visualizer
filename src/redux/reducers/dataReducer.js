import {
	SET_SAME_ARRAY,
	SET_NEW_ARRAY,
	DISABLE_ALL,
	DISABLE_SORT,
	SET_INDICES,
} from '../actions/actionTypes';

const initialState = {
	sameArray: [],
	newArray: [],
	allDisabled: false,
	sortDisabled: false,
	indices: [],
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SAME_ARRAY:
			return {
				...state,
				sameArray: action.payload,
			};
		case SET_NEW_ARRAY:
			return {
				...state,
				newArray: action.payload,
			};
		case DISABLE_ALL:
			return {
				...state,
				allDisabled: action.payload,
			};
		case DISABLE_SORT:
			return {
				...state,
				sortDisabled: action.payload,
			};
		case SET_INDICES:
			return {
				...state,
				indices: action.payload,
			};
		default:
			return state;
	}
};

export default dataReducer;
