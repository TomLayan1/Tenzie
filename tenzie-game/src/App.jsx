import React, { useEffect, useState } from 'react'
import './App.css';
import Dice from './Component/Dice';
// install nanoid (npm install nanoid) to generate random numbers
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


const App = () => {

  // STEP 1
  // This function will return random numbers
  const generateNewDice = () => {
    const randomNumbers = Math.ceil(Math.random() * 6)
    return {
      // call the nanoid function as the id value 
      id: nanoid(),
      value: randomNumbers,
      isHeld: false
    }
  }

  // STEP 2
  // Write a function that will generate 10 random number
  const allNewDIce = () => {
    let newDice = [];
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  // STEP 3
  // declare a state and set the state value as the allNewDice function
  const [newDice, setNewDice] = useState(allNewDIce());

  // STEP 5
  // This function will generate random u=numbers whenever the roll button is clicked
  const rollDice = () => {
    if (!tenzies) {
      setNewDice(prevDice => {
        return prevDice.map(dice => {
          return dice.isHeld ? dice : generateNewDice()
        })
      })
    }else{
      setTenzies(false);
      setNewDice(allNewDIce());
    }
  }

  // STEP 6
  // This function will prevent numbers that have been held from
  // grnerating random numbers 
  const holdDice = (id) => {
    setNewDice(prev => {
      return prev.map(dice => {
        return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
      })
    })
  }
  // STEP 7
  const [tenzies, setTenzies] = useState(false)


  // STEP 8
  useEffect(()=> {
    const allHeld = newDice.every(dice => dice.isHeld);
    const firstValue = newDice[0].value;
    const allSameValue = newDice.every(dice => dice.value === firstValue);

    if(allHeld && allSameValue) {
      setTenzies(true);
      console.log('YOU WIN GOOD JOB!')
    }
  },[newDice])

  // STEP 4
  // Create instances for each number
  const diceElement = newDice.map((diceNum) => {
    return (
      <Dice key={diceNum.id} id={diceNum.id} value={diceNum.value} isHeld={diceNum.isHeld} holdDice={() => holdDice(diceNum.id)} />
    )
  })

  return (
    <div className="App"> 
        {tenzies && <Confetti />}
      <div className='name-container'>
        <h2>Tenzie</h2>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice-constainer'>
        {diceElement}
      </div>
      <div className='btn-container'>
        <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      </div>
    </div>
  );
}

export default App