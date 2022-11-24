import React, { useEffect, useState } from "react"
import { ErrorMessage, PageContainer, PageTitle } from "../../components/main"
import useApi from "../../helpers/BtxAPI"
import { doLogin } from "../../helpers/AuthHandler"

import { PageArea } from "./styled"

const SignUP = () => {
  const api = useApi()

  const [name, setName] = useState("")
  const [stateLoc, setStateLoc] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")
  const [stateList, setStateList] = useState([])

  useEffect(() => {
    const getStates = async () => {
      const list = await api.getStates()
      setStateList(list)
    }
    getStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisabled(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Senha e confirmação não conferem")
      setDisabled(false)
      return
    }

    const json = await api.register(name, email, password, stateLoc)

    if (json.error) {
      setError(json.error)
    } else {
      doLogin(json.token)
      window.location.href = "/"
    }

    setDisabled(false)
  }

  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <label className='area'>
            <div className='area-title'>Nome Completo</div>
            <div className='area-input'>
              <input
                type='text'
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>Estado</div>
            <div className='area-input'>
              <select
                required
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
              >
                <option></option>
                {stateList.map((i, k) => (
                  <option key={k} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>E-mail</div>
            <div className='area-input'>
              <input
                type='email'
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>Senha</div>
            <div className='area-input'>
              <input
                type='password'
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'>Confirmar senha</div>
            <div className='area-input'>
              <input
                type='password'
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className='area'>
            <div className='area-title'></div>
            <div className='area-input'>
              <button disabled={disabled}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignUP
