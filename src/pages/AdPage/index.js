import React, { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css";
import { PageContainer } from "../../components/main"
import useApi from "../../helpers/BtxAPI"

import { PageArea, Fake } from "./styled"

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
  }, [])

  return (
    <PageContainer>
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
          </div>
          <div className='box box--padding'>
            {loading && <Fake height={50} />}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  )
}

export default AdPAge
