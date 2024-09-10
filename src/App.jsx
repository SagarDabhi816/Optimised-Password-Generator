import { useCallback, useState ,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref = useRef(null);

  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed) str += "0123456789"
    if(charallowed) str += "~!@#$%^&*()_.+-/=?@[]{}"

    for (let i = 1; i <=length; i++) {
     let char = Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char);
    }

    setpassword(pass)

  },[length,numallowed,charallowed,setpassword]);

  const copypass =useCallback(()=>{
      passwordref.current?.select();  
    window.navigator.clipboard.writeText(password)
  },[password]);


  useEffect(()=>{passwordgenerator()},[length,numallowed,charallowed,passwordgenerator]);

  return (
    <>
     <div className='scale-[1.1] absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full max-w-[45vw] h-[20vw] shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-900 '>
     <h1 className='text-white text-center mb-4 text-4xl'>Password Generator</h1>
      <div className='text-xl mt-10 flex shadow rounded-lg overflow-hidden mb-4 scale-[1] h-[3vw]' >
        <input className="outline-none h-full w-full py-1 px-3" type="text" value={password} placeholder='Password' ref={passwordref} readOnly/>
        <button className='outline-none bg-blue-700 text-white  px-3 py-0.5 shrink-0' onClick={copypass}>Copy</button>
      </div>
      <div className="mt-10 gap-x-3 scale-[2] flex items-center justify-center  ">
          <input type="range" min={6} max={100} value={length} onChange={(e) => {setlength(e.target.value)}} className='cursor-pointer'/>
          <label>Length : {length}</label>
      </div>
      <div className="mt-5 flex items-center justify-center text-3xl gap-x-20 scale-[1]">    
        <div className='flex items-center gap-x-2 scale-[1.4]'> 
        <input type='checkbox' defaultChecked={numallowed} id='numberInput' onChange={()=>{setnumallowed((prev) => !prev);}} />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-2 scale-[1.4]'> 
        <input type='checkbox' defaultChecked={charallowed} id='characterInput' onChange={()=>{setcharallowed((prev) => !prev)}} />
          <label htmlFor='characterInput'>character </label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App;
