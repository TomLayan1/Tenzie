import React from 'react'
import './Dice.css'


const Dice = ({value, isHeld, holdDice}) => {
  const stylez = {
    backgroundColor: isHeld ? 'green' : 'white'
  }


  return (
    <div className='dice' style={stylez} onClick={holdDice}>
      <img className='dice-image' src={ require(`../Assets/${value}.png`)} alt='dice'/>
    </div>
  )
}

export default Dice