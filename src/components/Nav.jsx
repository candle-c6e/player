import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ isShowLibrary, setIsShowLibrary }) => {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setIsShowLibrary(!isShowLibrary)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}

export default Navbar