'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      {isSignUp ? <SignupForm /> : <LoginForm />}

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </div>
  )
}