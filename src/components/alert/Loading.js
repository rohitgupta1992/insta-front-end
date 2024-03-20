import React from 'react'
import LoadIcon from '../../images/loading.gif'
const Loading = () => {
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
        style={{background: "#0008", color: "white", top: 0, left: 0, zIndex: 50}}>

            {/* <svg width="205" height="250" viewBox="0 0 40 50">
                <polygon stroke="#fff" strokeWidth="3" fill="none"
                points="20,1 40,40 1,40" />
                <text fill="#fff" x="5" y="47">Loading</text>
            </svg> */}
            <img className="loading" src={LoadIcon} alt="loading"  />
            
        </div>
    )
}

export default Loading
