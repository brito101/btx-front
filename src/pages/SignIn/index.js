import React, { useState } from "react"
import { PageContainer, PageTitle } from "../../components/main"
import useApi from "../../helpers/BtxAPI"
import { doLogin } from "../../helpers/AuthHandler"

import { PageArea } from "./styled"

const SignIn = () => {
  const api = useApi()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    const json = await api.login(email, password)

    if (json.error) {
      setError(json.error)
    } else {
      doLogin(json.token, remember)
      window.location.href = "/"
    }
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className='area'>
            <div className='area-title'>E-mail</div>
            <div className='area-input'>
              <input type='email' disabled={disabled} />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>Senha</div>
            <div className='area-input'>
              <input type='password' disabled={disabled} />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>Lembrar senha</div>
            <div className='area-input'>
              <input type='checkbox' disabled={disabled} />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'></div>
            <div className='area-input'>
              <button disabled={disabled}>Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignIn
