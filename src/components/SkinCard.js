import PropTypes from 'prop-types';
import React from "react";

import { IconContext } from "react-icons";
import { BsLink45Deg } from "react-icons/bs";

const SkinCard = props => {

	const urlRegex = RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i);
	const hasSourceLink = urlRegex.test(props.source);

	const nameToId = (name, author) => {
		name = name.replaceAll(" ", "-").toLowerCase();
		author = author.replaceAll(" ", "-").toLowerCase();
		const id = `${name}-by-${author}`;
		return id;
	};

	const copyLink = () => {
		navigator.clipboard.writeText(`${window.location.origin}/#${nameToId(props.name, props.author)}`);
	};

	return (
		<div className="skin-card" id={nameToId(props.name, props.author)}>
			<IconContext.Provider value={{ size: "1.5em" }}>
				<div>
					<button className='skin-link' title="Copy link" onClick={copyLink}><BsLink45Deg/></button>
				</div>
			</IconContext.Provider>
			<div className='preview-container'>
				<img src={ props.image } />
			</div>
			<div className="text-container">
				<h3>{hasSourceLink ? <a href={props.source} data-umami-event="skin-click" data-umami-event-skin={nameToId(props.name, props.author)} target='_blank' rel="noreferrer" title='Download skin'>{props.name}</a> : props.name}</h3>
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
