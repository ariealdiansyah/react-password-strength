/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import './App.css'
import zxcvbn from 'zxcvbn';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

function App() {
  const [password, setPassword] = useState("")
  const [str, setStr] = useState();
  const [type, setType] = useState(false)

  useEffect(() => {
    const validation = (val) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_\-+=])[A-Za-z\d!@#$%^&*_\-+=]{0,}/;
      const match = val.match(regex)
      return match ? true : false
    }

    if (password !== "") {
      if (validation(password)) {
        const res = zxcvbn(password)
        if (res.score < 2) {
          setStr('Match but weak')
        } else if (res.score >= 2 && res.score < 3) {
          setStr('Poor')
        } else if (res.score >= 3 && res.score < 4) {
          setStr('Good')
        } else if (res.score >= 4) {
          setStr('Strong')
        }
      } else {
        setStr('Not Match')
      }
    } else {
      setStr("")
    }
  }, [password, str]);

  return (
    <>
      <div className="card bg-white rounded-xl">
        <p className="text-black mb-2">
          Password Strength
        </p>
        <div className='relative'>
          <input type={type ? 'text' : 'password'} name="password" id="password" className='bg-slate-400 rounded-md py-1 px-2 text-white focus:bg-slate-500' onChange={e => setPassword(e.target.value)} />
          <button className='pointer-events w-8 h-8 absolute z-10 transform right-0.5' onClick={() => setType(type => !type)}>
            {type ? <EyeSlashIcon className="h-6 w-6 text-white" /> : <EyeIcon className="h-6 w-6 text-white" />}
          </button>
        </div>
        {str !== '' ? <>
          <div className={str === 'Strong' ? 'bg-green-600 text-white w-full rounded-md p-2 mt-2' : str === 'Poor' ? 'bg-orange-500 text-white w-full rounded-md p-2 mt-2' : str === 'Good' ? 'bg-sky-600 text-white w-full rounded-md p-2 mt-2' : str === 'Match but weak' ? 'bg-amber-300 text-white w-full rounded-md p-2 mt-2' : 'bg-red-600 text-white w-full rounded-md p-2 mt-2'}>
            {str}
          </div>
        </> : null}
      </div>
    </>
  )
}

export default App
