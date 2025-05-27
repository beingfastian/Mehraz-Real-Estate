import React from 'react'

const Common_btn = ({text,handler}) => {
  return (
    <button type='button' className="mx-auto common-btn-size common-btn" onClick={handler}>{text}</button>
  )
}

export default Common_btn
