import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { PageContainer } from "../../components/main"
import useApi from "../../helpers/BtxAPI"

import { PageArea } from "./styled"

const AdPAge = () => {
  const api = useApi()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [adInfo, setAdInfo] = useState([])

  return (
    <PageContainer>
      <PageArea>
        <div className='leftSide'>
          <div className='box'>
            <div className='adImage'>...</div>
            <div className='adInfo'>
              <div className='adName'>...</div>
              <div className='adDescription'>...</div>
            </div>
          </div>
        </div>
        <div className='rightSide'>...</div>
      </PageArea>
    </PageContainer>
  )
}

export default AdPAge
