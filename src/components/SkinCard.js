import PropTypes from 'prop-types';
import React from "react";

const SkinCard = props => {

	const urlRegex = RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/i);
	const hasSourceLink = urlRegex.test(props.source);

	return (
		<div className="skin-card">
			<img src={ props.image } />
			<div className="text-container">
				<h3>{hasSourceLink ? <a href={props.source} target='_blank'>{props.name}</a> : props.name}</h3>
				<h4>{props.author ? `by ${props.author}` : 'unknown author' }</h4>
				<p>{ props.description }</p>
				<p className='date'>Added on { props.dateAdded }</p>
			</div>
		</div>
	);
};

SkinCard.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	source: PropTypes.string,
	author: PropTypes.string,
	description: PropTypes.string,
	dateAdded: PropTypes.string,
};

export default SkinCard;
