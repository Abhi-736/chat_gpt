import React from 'react'
import openai from '../openai.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="heading">
            <img src={openai} alt='openai' />
            <div className="chat"><Link className='link' to='/'>AI Chat</Link></div>
            <div className="image_generate">
                <Link className='link' to='/ImgGenerator'>Image Generator</Link>
            </div>
        </div>
    )
}

export default Header