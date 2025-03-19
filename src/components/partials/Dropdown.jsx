import React from 'react'

const Dropdown = ({ title, options, func}) => {
  return (
    <div className="relative group">
        <select defaultValue='0' onChange={func} name="format" id="format">
            <option value="0" disabled>{title}</option>
            {options.map((o, i) => (
                <option key={i} value={o}>
                    {o.toUpperCase()}
                </option>
            ))}
        </select>
        <i className="ri-arrow-down-s-fill absolute right-3 top-1/2 -translate-y-1/2 text-white group-hover:text-[#6556CD] transition-colors duration-300 pointer-events-none"></i>
    </div>
  ) 
}

export default Dropdown