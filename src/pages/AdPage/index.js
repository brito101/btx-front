import React, { useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { PageContainer } from "../../components/main"
import Aditem from "../../components/partials/Aditem"
import useApi from "../../helpers/BtxAPI"

import { PageArea, Fake, OthersArea, BreadCrumb } from "./styled"

const AdPAge = () => {
  const api = useApi()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [adInfo, setAdInfo] = useState({})

  useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true)
      setAdInfo(json)
      setLoading(false)
    }
    getAdInfo(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <PageContainer>
      {adInfo.category && (
        <BreadCrumb>
          Você está aqui: <Link to='/'>Home</Link>/
          <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
          <Link
            to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
          >
            {adInfo.category.name}
          </Link>
          / {adInfo.title}
        </BreadCrumb>
      )}

      <PageArea>
        <div className='leftSide'>
          <div className='box'>
            <div className='adImage'>
              {loading && <Fake height={300} />}
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div key={k} className='each-slide'>
                      <img src={img} alt='' />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className='adInfo'>
              <div className='adName'>
                {loading && <Fake height={20} />}
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>
                    Criado em{" "}
                    {new Date(adInfo.dateCreated).toLocaleDateString("pt-br", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </small>
                )}
              </div>
              <div className='adDescription'>
                {loading && <Fake height={100} />}
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className='rightSide'>
          <div className='box box--padding'>
            {loading && <Fake height={20} />}
            {adInfo.priceNegotiable && "Preço Negociável"}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className='price'>
                Preço:{" "}
                <span>
                  {adInfo.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}
          </div>
          {loading && <Fake height={50} />}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target='_blank'
                className='contactSellerLink'
                rel='noreferrer'
              >
                Fale com o vendedor
              </a>
              <div className='createdBy box box--padding'>
                {loading && <Fake height={50} />}
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </PageArea>
      <OthersArea>
        {adInfo.others && (
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className='list'>
              {adInfo.others.map((i, k) => (
                <Aditem key={k} data={i} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  )
}

export default AdPAge
