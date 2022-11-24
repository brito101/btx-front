import React, { useEffect, useState } from "react"
import { PageArea, SearchArea } from "./styled"
import { PageContainer } from "../../components/main"
import useApi from "../../helpers/BtxAPI"
import { Link } from "react-router-dom"

const Home = () => {
  const api = useApi()

  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])

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

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className='searchBox'>
            <form method='GET' action='/ads'>
              <input type='text' name='q' placeholder='O que você procura?' />
              <select name='state'>
                {stateList.map((i, k) => (
                  <option key={k} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className='categoryList'>
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className='categoryItem'>
                <img src={i.img} alt='' />
                <span>{i.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>
        <PageArea>...</PageArea>
      </PageContainer>
    </>
  )
}

export default Home
