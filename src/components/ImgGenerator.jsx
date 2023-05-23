import React from 'react';

const ImgGenerator = () => {

    const [load, setLoad] = React.useState(false)
    const [userInput, setuserInput] = React.useState('')
    const [arr, setArr] = React.useState([]);
    const [imagesURL, setimagesURL]= React.useState([]);

    const key = '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';

    const fetc = async () => {
        try {setLoad(true);
            const res = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${key}`
                },
                body: JSON.stringify({
                    "prompt": userInput,
                    "n": 4,
                    "size": "1024x1024"
                })
            });
            const {data} = await res.json();
           
            setimagesURL(data);
            setuserInput('')
            setLoad(false);
        }
        catch (error) { console.log(error);
            setLoad(false); }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(userInput)
        setArr((value)=>[...value,userInput])
        
        console.log(arr)
        userInput.trim() !== '' ?
            fetc() : console.log('nothing')
    }

    return (
        <div className={imagesURL.length ? 'dividedContainer' : 'undividedContainer'}>
            <div className={imagesURL.length ? "sideBar" : 'NOsidebar'}>
                {arr.length&&(arr.map((value, index) => <div className='questions' key={index} >{value}...</div>))}
            </div>
            <div className="imgContainer">
                <section className="AiImageGenerator">

                    {imagesURL.length ? (<div className='images'>{imagesURL.map((value, index)=><img key={index} onClick={()=>{window.location.href=value.url}} src={`${value.url}`} alt='images' />)}</div>):(load?<div className="loadscreen">Loading..</div>:<div>
                        <header>Imagenerator</header>
                        <div className="description">AI system that can create realistic images and art from a description in natural language.</div>
                    </div>)  }

                </section> 
                <div className="searchBar">
                    <form onSubmit={(e) => {handelSubmit(e)}}>
                        <input type='textarea' placeholder='Type here' onChange={(e) => { setuserInput(e.target.value) }} />
                        <button >{load?'Loading..':'Submit'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ImgGenerator