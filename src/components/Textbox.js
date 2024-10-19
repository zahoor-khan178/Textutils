
// import React from 'react'
import React, { useState } from 'react'

export default function Textbox(props) {


  const [text, settext] = useState('');

  const newtext = text.toUpperCase();
  const lowertext = text.toLowerCase();

  const text1 = text.replace(/ /g, '');

  const handle = () => {
    settext(newtext);

  }
  const change = (event) => {
    settext(event.target.value);

  }

  const lower = () => {

    settext(lowertext);
  }

  const clear = () => {

    settext('');
  }
  const withoutspace = () => {

    settext(text.replace(/ /g, ''))
  }






  const copytext = () => {                                // copying text


    if (text !== '') {

      navigator.clipboard.writeText(text)
        .then(() => {

          alertbox();

        }).catch((err) => {

          console.log('Failed to copy text   :', err)


        })
    }




  }


  const alertbox = () => {

    document.getElementsByClassName('alert')[0].style.display = 'block';

    setTimeout(() => {

      document.getElementsByClassName('alert')[0].style.display = 'none';

    }, 2000)

   
  }








  return (
    <>

      <div>
     

        <div className="container" >
          <div className="alert">Text copied to clipboard</div>
          <label htmlFor="mybox" className="form-label"  ><h1>Enter your text</h1></label>
          <textarea className="form-control" id="mybox" rows="8" value={text} onChange={change}></textarea>
          <button className="btn btn-primary my-3" onClick={handle} >convert to uppercase</button>
          <button className="btn btn-primary my-3" onClick={lower} style={{ marginLeft: '10px' }}>convert to lowercase</button>
          <button className="btn btn-primary my-3" onClick={withoutspace} style={{ marginLeft: '10px' }}  >remove blank spaces</button>
          <button className="btn btn-primary my-3" onClick={copytext} style={{ marginLeft: '10px' }}  >copy text</button>
          <button className="btn btn-primary my-3" onClick={clear} style={{ marginLeft: '10px' }} id='clear' >clear text</button>
        
        </div>
      

      <div className="container">

        <h1>Text summary</h1>
        <p>{text.trim() === '' ? 0 : text.trim().split(/\s+/).length} words</p>
        <p>{text1.length} characters</p>
        <h1>Text preview</h1>
        <p>{text}</p>
      </div>
</div>


    </>

  )
}
