'use strict'
const inputPanel = document.querySelector("#input")
const buttons = document.querySelectorAll(".calcBtn")
let entry
let current = ""
let ans
let reset = false

let addInputValue = (inputVal, val) => {
  if(inputVal.innerText==="0" && val === '.'){
    inputVal.innerText += val
  } else if (inputVal.innerText==="0") {
    inputVal.innerText = val
  } else {
    inputVal.innerText += val
  } 
}

const startCalculator = () => {
  buttons.forEach((button) => {
    button.addEventListener('click', buttonPressed, false)
  })
}

const checkForOperationButton = (val) => {
  const operations = ["divided", "times", "plus", "minus"]
  return operations.includes(val)
}

const checkForOnlyZero = () => {
  return inputPanel.innerText.length === 1 && inputPanel.innerText === "0"
}

const setOperationValue = (inputVal, val) => {
  current += inputVal.innerText + val;
  inputVal.innerText = val
}

const checkForOperatorInPanel = () => {
  return /[+]|[-]|[*]|[/]/.test(inputPanel.innerText)
}

const showResult = () => {
  reset = true
  if (checkForOperatorInPanel())
    current =  current.substring(0,current.length-1)
  current += inputPanel.innerText
  ans = eval(current)
  
  inputPanel.innerText = ans
}

const buttonPressed = (button) => {
  if (reset) {
    current = ""
    inputPanel.innerText = 0
    ans = 0
    reset = false
  }
  entry = button.target.id;

  // Check for existing decimal point
  if (entry === 'dot' && !/[.]/.test(inputPanel.innerText) && inputPanel.innerText.length >= 1) {
    addInputValue(inputPanel, '.')
  }

  if(checkForOperationButton(entry) && inputPanel.innerText.slice(-1) === "." && checkForOnlyZero())
    return
  
  if (entry !== "ac" 
      && entry !== "ce" 
      && entry !== "divided" 
      && entry !== "plus"
      && entry !== "minus"
      && entry !== "times" 
      && inputPanel.innerText.length === 10)
    return
  
  if(checkForOperatorInPanel()) {
    inputPanel.innerText = ''  
  }

  switch(button.target.id) {
    case 'ac':
      inputPanel.innerText = 0
      current = ""
      console.log("Current after ac: "+current)
      break
    case 'ce':
      inputPanel.innerText = 0
      console.log("Current after ce: "+current)
      break
    case "one":
      addInputValue(inputPanel, 1)
      break
    case "two":
      addInputValue(inputPanel, 2)
      break
    case "three":
      addInputValue(inputPanel, 3)
      break
    case "four":
      addInputValue(inputPanel, 4)
      break
    case "five":
      addInputValue(inputPanel, 5)
      break
    case "six":
      addInputValue(inputPanel, 6)
      break
    case "seven":
      addInputValue(inputPanel, 7)   
      break
    case "eight":
      addInputValue(inputPanel, 8) 
      break
    case "nine":
      addInputValue(inputPanel, 9)  
      break
    case "zero":
      if (!checkForOnlyZero()) {
        addInputValue(inputPanel, 0)
      }
      break
    case "divided":
      setOperationValue(inputPanel, '/')
      break
    case "times":
      setOperationValue(inputPanel, '*')
      break
    case "plus":
      setOperationValue(inputPanel, '+')
      break
    case "minus":
      setOperationValue(inputPanel, '-')
      break
    case "equals":
      showResult()
      break
  }
}

startCalculator();
