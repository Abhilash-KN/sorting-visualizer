import React from 'react';
import styles from './Styles.module.css';
import { connect } from 'react-redux';
import {
	setSameArray,
	setNewArray,
	disableAll,
	disableSort,
	setIndices,
} from '../redux';

function MergeSort(props) {
	var t = 1;
	const time = 10;
	function merge(a, l, m, r) {
		let arr = [];
		let i = l;
		let j = m;
		while (i < m && j < r) {
			if (a[i] < a[j]) {
				arr.push(a[i]);
				i++;
			} else {
				arr.push(a[j]);
				j++;
			}
			setTimeout((indices) => props.setIndices(indices), t * time, [
				i,
				j,
			]);
			t++;
		}
		while (i < m) {
			arr.push(a[i]);
			i++;
		}
		while (j < r) {
			arr.push(a[j]);
			j++;
		}
		i = 0;
		for (let j = l; j < r; j++) {
			a[j] = arr[i];
			i++;
			setTimeout((a) => props.setNewArray(a), t * time, [...a]);
			t++;
		}
	}
	function mergeSort(a, l, r) {
		if (r - l <= 1) return;
		let m = Math.floor((l + r) / 2);
		mergeSort(a, l, m);
		mergeSort(a, m, r);
		merge(a, l, m, r);
	}
	return (
		<button
			className={props.sortDisabled ? styles.disabled : styles.button}
			disabled={props.sortDisabled}
			onClick={() => {
				props.disableAll(true);
				props.disableSort(true);
				mergeSort([...props.newArray], 0, props.newArray.length);
				setTimeout(() => {
					props.setIndices([]);
					let indices = [];
					let i = 0;
					for (i = 0; i < props.newArray.length; i++) {
						indices.push(i);
						setTimeout(
							(indices) => props.setIndices(indices),
							i * time,
							[...indices]
						);
					}
					setTimeout(() => {
						props.disableAll(false);
						props.setIndices([]);
					}, i * time);
				}, t * time);
			}}>
			Merge Sort
		</button>
	);
}

const mapStateToProps = (state) => {
	return {
		sameArray: state.sameArray,
		newArray: state.newArray,
		allDisabled: state.allDisabled,
		sortDisabled: state.sortDisabled,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSameArray: (arr) => dispatch(setSameArray(arr)),
		setNewArray: (arr) => dispatch(setNewArray(arr)),
		disableAll: (state) => dispatch(disableAll(state)),
		disableSort: (state) => dispatch(disableSort(state)),
		setIndices: (indices) => dispatch(setIndices(indices)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MergeSort);
