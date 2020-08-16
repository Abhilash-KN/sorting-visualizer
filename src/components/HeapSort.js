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

function HeapSort(props) {
	var t = 1;
	const time = 10;
	function shiftDown(a, n, i) {
		let m = i;
		let l = 2 * i + 1;
		let r = 2 * i + 2;
		if (l < n && a[i] < a[l]) {
			m = l;
			setTimeout((indices) => props.setIndices(indices), t * time, [
				i,
				l,
			]);
			t++;
		}
		if (r < n && a[m] < a[r]) {
			m = r;
			setTimeout((indices) => props.setIndices(indices), t * time, [
				m,
				r,
			]);
			t++;
		}
		if (m !== i) {
			let x = a[i];
			a[i] = a[m];
			a[m] = x;
			shiftDown(a, n, m);
			setTimeout((a) => props.setNewArray(a), t * time, [...a]);
			t++;
		}
	}
	function heapSort() {
		props.disableAll(true);
		props.disableSort(true);
		let a = [...props.newArray];
		let n = a.length;
		for (let i = Math.floor(n / 2); i >= 0; i--) {
			shiftDown(a, n, i);
		}
		for (let i = 0; i < n; i++) {
			let x = a[0];
			a[0] = a[n - i - 1];
			a[n - i - 1] = x;
			shiftDown(a, n - i - 1, 0);
			setTimeout((a) => props.setNewArray(a), t * time, [...a]);
			t++;
		}
		setTimeout(() => {
			props.setIndices([]);
			let indices = [];
			let i = 0;
			for (i = 0; i < props.newArray.length; i++) {
				indices.push(i);
				setTimeout((indices) => props.setIndices(indices), i * time, [
					...indices,
				]);
			}
			setTimeout(() => {
				props.disableAll(false);
				props.setIndices([]);
			}, i * time);
		}, t * time);
	}
	return (
		<button
			className={props.sortDisabled ? styles.disabled : styles.button}
			disabled={props.sortDisabled}
			onClick={heapSort}>
			Heap Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(HeapSort);
