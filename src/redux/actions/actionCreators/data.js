import {
	SET_SAME_ARRAY,
	SET_NEW_ARRAY,
	DISABLE_ALL,
	DISABLE_SORT,
	SET_INDICES,
} from '../actionTypes';

export const setSameArray = (arr) => {
	return {
		type: SET_SAME_ARRAY,
		payload: arr,
	};
};

export const setNewArray = (arr) => {
	return {
		type: SET_NEW_ARRAY,
		payload: arr,
	};
};

export const disableAll = (state) => {
	return {
		type: DISABLE_ALL,
		payload: state,
	};
};

export const disableSort = (state) => {
	return {
		type: DISABLE_SORT,
		payload: state,
	};
};

export const setIndices = (indices) => {
	return {
		type: SET_INDICES,
		payload: indices,
	};
};
