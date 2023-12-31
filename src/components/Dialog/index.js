import React from "react";
import PropTypes from "prop-types";

import Item from "./Item";
import Title from "./Title";

import { normalizeDialog } from "./helpers";
import reducer from "./reducer";
import data from "../../data";

import "./styles.css";

const Dialog = ({ newMessage }) => {
	const dialogRef = React.useRef();
	const [state, dispatch] = React.useReducer(reducer, {
		messages: data,
	});

	React.useEffect(() => {
		if (newMessage) {
			dispatch({
				type: "add-message",
				payload: newMessage,
			});

			setTimeout(() => {
				dispatch({
					type: "update-status",
					payload: {
						id: newMessage.id,
						status: "readed",
					},
				});
			}, 3000);
		}
	}, [newMessage]);

	React.useEffect(() => {
		dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
	}, [state.messages.length]);

	const onRemove = (id) => {
		dispatch({
			type: "remove-message",
			payload: id,
		});
	};

	const normalizedDialog = normalizeDialog(data);

	return (
		<div className="dialog">
			<div className="overflow" ref={dialogRef}>
				{normalizedDialog.map((item) =>
					item.type === "message" ? (
						<Item {...item} key={item.id} onRemove={onRemove} />
					) : (
						<Title key={item.id} date={item.date} />
					)
				)}
			</div>
		</div>
	);
};

Dialog.propTypes = {
	newMessage: PropTypes.shape({
		id: PropTypes.number,
	}),
};

export default Dialog;