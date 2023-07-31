import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai"

console.log(process.env.REACT_APP_APIKEY)

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_APIKEY,
  })
)

function App() {
  const [text, setText] = useState("")
  const [handleAIPopup, setHandleAIPopup] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")

  async function handleGenerateResponse() {
    console.log("running handleGenerateResponse")
    const res = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", content: `
      "${text}" ${prompt}
      ` }],
    })

    setResponse(res.data.choices[0].message.content)

  }

  function handleAdd() {
    setText(text + "\n\n" + response)
    setHandleAIPopup(false)
  }

  function handleReplace() {
    setText(response)
    setHandleAIPopup(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder='Type Something...' />

        <button onClick={() => {setResponse(""); setHandleAIPopup(true);}}>
          AI Generate
        </button>
      </header>
      {handleAIPopup &&
        <section className='ai-popup'>
          <div className='container'>
            <code className='response-area'>
              {response}
            </code>
            <div className='prompt'>
              <input className='prompt-input' type="text" placeholder='type something here...' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <button className='prompt-btn' onClick={() => handleGenerateResponse()}>
                Generate
              </button>
            </div>
            <div className='functional-btn'>
              <button onClick={() => handleAdd()}>Add line</button>
              <button onClick={() => handleReplace()}>Replace Text</button>
            </div>
          </div>
        </section>}
    </div>
  );
}

export default App;
