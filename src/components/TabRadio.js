import React from 'react';

function TabRadio({ name, value, checked, text, icon, iconAlt, onChange }) {

  return (
	<label className={`tabRadio ${checked ? 'checked' : ''}`}>
		<input
			type='radio'
			name={name}
			value={value}
			checked={checked}
			onChange={onChange}
		/>
		<img src={icon} className='icon' alt={iconAlt} />
		<span>{text}</span>
	</label>
  );

}

export default TabRadio;