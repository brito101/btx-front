import React from "react"
import { Link } from "react-router-dom"
import { Item } from "./styled"

const AdItem = ({data}) => {
  let price = ""

  if (data.priceNegotiable) {
    price = "Preço Negociável"
  } else {
    price = data.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <Item className='adItem'>
      <Link to={`/ad/${data.id}`}>
        <div className='itemImage'>
          <img src={data.image} alt='' />
        </div>
        <div className='itemName'>{data.title}</div>
        <div className='itemPrice'>{price}</div>
      </Link>
    </Item>
  )
}

export default AdItem
