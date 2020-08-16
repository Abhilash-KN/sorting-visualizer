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
function QuickSort(props) {
	var t = 1;
	const time = 10;
	function partition(a, l, r, p) {
		let i = l;
		let j = r - 1;
		while (j >= i) {
			if (p < a[i]) {
				let x = a[i];
				a[i] = a[j];
				a[j] = x;
				j--;
				setTimeout(
					(a, indices) => {
						props.setNewArray(a);
						props.setIndices(indices);
					},
					t * time,
					[...a],
					[l, i]
				);
				t++;
			} else {
				setTimeout((indices) => props.setIndices(indices), t * time, [
					l,
					i,
				]);
				t++;
				i++;
			}
		}
		let x = a[l];
		a[l] = a[j];
		a[j] = x;
		setTimeout((a) => props.setNewArray(a), t * time, [...a]);
		t++;
		return j;
	}
	function quickSort(a, l, r) {
		if (l >= r) return;
		let m = partition(a, l, r, a[l]);
		quickSort(a, l, m);
		quickSort(a, m + 1, r);
	}
	return (
		<button
			className={props.sortDisabled ? styles.disabled : styles.button}
			disabled={props.sortDisabled}
			onClick={() => {
				props.disableAll(true);
				props.disableSort(true);
				quickSort([...props.newArray], 0, props.newArray.length);
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
				console.log(t);
			}}>
			Quick Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickSort);
