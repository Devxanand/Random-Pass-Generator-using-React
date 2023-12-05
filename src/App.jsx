import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
// --------------useState hooks---------------
function App() {
  const [length, setlength] = useState(6)
  const [numberAllowed , setNumbarAllowed] = useState(false)
  const [characterAllowed , setCharacterAllowed] = useState(false)
  const [Password , setPassword]= useState("")
    // ------------useRef hooks -------------
    const passRef = useRef(null)
// ---------useCallback hooks------------
  const passwordGenerator = useCallback( () =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvvwxyz"

    if (numberAllowed) str += "1234567890"
    if (numberAllowed) str += "!@#$%^&*()<>?|~_-+."
// ----------------for loop--------------------
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)

    }
    setPassword(pass)

  } , [length, numberAllowed , characterAllowed , setPassword])



  const copyPasswordToClipBoard = useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,10)
 window.navigator.clipboard.writeText(Password)
  },[Password])


// ---------------useEffect hooks -----------------
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <>
    <div className=' text-orange-500 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 flex flex-col justify-center align-middle'>
     <h1 className=' font-medium' style={{fontSize:"23px"}}>Password Generator</h1>
     
     <div className="inputbox">
     <input type="text" readOnly placeholder='Password' className=' py-1 px-2 rounded-s-md w-80 outline-none' value={Password} ref={passRef}/>
     <button className="bg-blue-800 text-white rounded-e-md px-3 py-1" onClick={copyPasswordToClipBoard} >copy</button>
     </div>

{/* --------------size changer------------------ */}
     <div className='checkbox flex my-6 gap-4' >      
      <input type="range" min={6} max={20} className=' w-32 cursor-pointer' value={length} onChange={(e)=>{setlength(e.target.value)}} />

      <div>Length:{length}</div>
{/* ---------------checkbox-------------------- */}
     <div className="checkbox1">
       <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumbarAllowed((prev)=> !prev)}}/><label htmlFor="Number">Number</label>
       </div>


      <div className="checkbox2">
        <input type="checkbox"  defaultChecked={characterAllowed} onChange={()=>{setCharacterAllowed((prev)=>!prev)}}/> <label htmlFor="">Character</label>
        </div>


     </div>
    </div>
    </>
  )
}

export default App
