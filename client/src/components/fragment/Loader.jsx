import React from 'react'
import './../assets/scss/loader.css'
const Loader = ({display}) => {
  return (
    <div class="lds-facebook" style={display?{}:{display:'none'}}><div></div><div></div><div></div></div>
  )
}

export default Loader