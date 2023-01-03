import React, { useEffect, useState } from "react"
import { PageArea } from "./styled"
import { PageContainer } from "../../components/main"
import useApi from "../../helpers/BtxAPI"
import { useSearchParams } from "react-router-dom"
import Aditem from "../../components/partials/Aditem"

let timer

const Ads = () => {
  const api = useApi()

  const [searchParams, setSearchParams] = useSearchParams()

  const useQueryString = () => {
    return new URLSearchParams(searchParams)
  }
  const query = useQueryString()

  const [q, setQ] = useState(query.get("q") !== null ? query.get("q") : "")
  const [cat, setCat] = useState(
    query.get("cat") !== null ? query.get("cat") : ""
  )
  const [state, setState] = useState(
    query.get("state") !== null ? query.get("state") : ""
  )
  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adsList, setAdsList] = useState([])
  const [resultOpacity, setResultOpacity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [adsTotal, setAdsTotal] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const getAdsList = async () => {
    setLoading(true)
    const json = await api.getAds({
      sort: "desc",
      limit: 2,
      q,
      cat,
      state,
    })
    setAdsList(json.ads)
    setAdsTotal(json.total)
    setResultOpacity(1)
    setLoading(false)
  }

  useEffect(() => {
    if (adsList.length > 0) {
      setPageCount(Math.ceil(adsTotal / adsList.length))
    } else {
      setPageCount(0)
    }
  }, [adsTotal, adsList])

  useEffect(() => {
    let queryString = []
    if (q) {
      queryString.push(`q=${q}`)
    }
    if (cat) {
      queryString.push(`cat=${cat}`)
    }
    if (state) {
      queryString.push(`state=${state}`)
    }

    setSearchParams(`?${queryString.join("&")}`)

    if (timer) {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(getAdsList, 1000)
    setResultOpacity(0.3)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, state, setSearchParams])

  useEffect(() => {
    const getStates = async () => {
      const list = await api.getStates()
      setStateList(list)
    }
    getStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories()
      setCategories(cats)
    }
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let pagination = []
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i)
  }

  return (
    <PageContainer>
      <PageArea>
        <div className='leftSide'>
          <form method='GET'>
            <input
              type='text'
              name='q'
              placeholder='O que você procura?'
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className='filterName'>Estado:</div>
            <select
              name='state'
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option></option>
              {stateList.map((i, k) => (
                <option key={k} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            <div className='filterName'>Categoria:</div>
            <ul>
              {categories.map((i, k) => (
                <li
                  key={k}
                  className={
                    cat === i.slug ? "categoryItem active" : "categoryItem"
                  }
                  onClick={() => setCat(i.slug)}
                >
                  <img src={i.img} alt='' />
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className='rightSide'>
          <h2>Resultados</h2>
          {loading && <div className='listWarning'>Carregando...</div>}
          {!loading && adsList.length === 0 && (
            <div className='listWarning'>Nenhum resultado encontrado</div>
          )}
          <div className='list' style={{ opacity: resultOpacity }}>
            {adsList.map((i, k) => (
              <Aditem key={k} data={i} />
            ))}
          </div>
          <div className='pagination'>
            {pagination.map((i, k) => (
              <div className='pageItem' key={k}>
                {i}
              </div>
            ))}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  )
}

export default Ads
