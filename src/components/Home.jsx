import React, { useEffect, useState } from 'react'

const Home = () => {
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(false)

    const key = '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';
    const fetchChat = async () => {
       
        const conversation = [...message, { "role": "user", "content": input }]
        
        console.log(load)

        fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": conversation,
                "temperature": 0.7
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage([...conversation, { "role": "assistant", "content": `${data.choices[0].message.content}` }]);
                setLoad(false)
                setInput('');
            })
            .catch(error => { console.log(error) });
            
            console.log(load)
        setCount(0)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true);
        if (input.trim() !== '') {
            fetchChat();
            
        };
    }
    useEffect(() => {
        count > 0 && input.trim() !== '' ?
            (fetchChat()
            ) :
            console.log('nothing')
    }, [count])

    return (
        <div className={message.length?'container':'singleContainer'}>
            <div className={message.length?'sideBar':'sidebarr'}>{message.filter((value) => value.role === 'user').map((value, index) => <div className='questions' onClick={() => {
                setInput(value.content);
                setCount(pre => pre + 1)

            }}>{value.content.split(" ").slice(0, 6).join(" ")}...
            </div>)}
            </div>
            <div className="main1">
                <div className="main">{message.length ? (message.map((value) => value.role === 'user' ?
                    <div className='user'>{value.role} = {value.content}</div>
                    : <div className='assistant' >{value.role} = {value.content}</div>))

                    : (<div className='box'>
                        <header>Your Personal AI Assistant</header>
                        <div className="section_box">
                            <section className="box1">
                                <header className="box1_heading">Examples</header>
                                <div className="examples">"Explain quantum computing in simple terms" →</div>
                                <div className="examples">"Got any creative ideas for a 10 year old’s birthday?" →</div>
                                <div className="examples">"How do I make an HTTP request in Javascript?" →</div>

                            </section>
                            <section className="box2">
                                <header className="box2_heading">Capabilities</header>
                                <div className="examples">Remembers what user said earlier in the conversation</div>
                                <div className="examples">Allows user to provide follow-up corrections</div>
                                <div className="examples">Trained to decline inappropriate requests</div>

                            </section>
                            <section className="box3">
                                <header className="box3_heading">Limitations</header>
                                <div className="examples">May occasionally generate incorrect information</div>
                                <div className="examples">May occasionally produce harmful instructions or biased content</div>
                                <div className="examples">Limited knowledge of world and events after 2021</div>

                            </section>
                        </div>
                    </div>)}
                </div>
                <div className="bottom">
                    <form onSubmit={handleSubmit}>
                        <input placeholder='type something' type='textarea' className='inputSearch' value={input} onChange={(e) => { setInput(e.target.value) }} />
                        <button className='submit'>{load?'Loading..':'Submit'}</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Home