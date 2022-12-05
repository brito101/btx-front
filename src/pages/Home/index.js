import React, { useEffect, useState } from "react"
import { PageArea, SearchArea } from "./styled"
import { PageContainer } from "../../components/main"
import useApi from "../../helpers/BtxAPI"
import { Link } from "react-router-dom"
import Aditem from "../../components/partials/Aditem"

const Home = () => {
  const api = useApi()

  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adsList, setAdsList] = useState([])

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

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      })
      setAdsList(json)
    }
    getRecentAds()
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
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className='list'>
            {adsList.map((i, k) => (
              <Aditem key={k} data={i} />
            ))}
          </div>
          <Link to='/ads' className='seeAllLink'>
            Ver todos
          </Link>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            consectetur diam sit amet convallis imperdiet. Suspendisse vel diam
            eu nisi sollicitudin pellentesque. Morbi vulputate turpis at justo
            sodales, eu efficitur ante convallis. Cras mattis, justo et ultrices
            iaculis, massa est volutpat neque, vitae porttitor enim mauris nec
            ante. Aenean tempor tellus ac pulvinar rutrum. Ut eleifend ut augue
            nec maximus. Vivamus accumsan efficitur viverra. Nulla finibus risus
            neque, vel facilisis velit pharetra et. Class aptent taciti sociosqu
            ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc
            ut blandit ante, vitae bibendum augue. Pellentesque facilisis cursus
            lorem, eu ultrices dui efficitur eu. Pellentesque posuere dolor nec
            lorem mollis ultrices. Pellentesque id tincidunt elit, bibendum
            sollicitudin ipsum.
          </p>
        </PageArea>
      </PageContainer>
    </>
  )
}

export default Home
