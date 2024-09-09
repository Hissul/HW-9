import React, { Component } from "react";
import { useState } from 'react'
import Menu from './Menu.jsx'
import Snake from "./Snake.jsx";
import Block from "./Block.jsx";
import './App.css'

const plaseBlock = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const init = {
  block: plaseBlock(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  snakeBody: [[0, 40], [2, 40], [4, 40], [6, 40]],
  score: 0
} 



class App extends Component{

  constructor() {
    super();
    this.state = init;   
  }

  startGame = () => {
      this.setState({
        route: "game"      
      });
  }

  onKeyDown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.snakeOutOfBorder();
    this.snakeSelfHarm();
    this.takeBlock();
  }


  moveSnake = () => {
    let dots = [...this.state.snakeBody];
    let head = dots[dots.length - 1];
    if (this.state.route === "game") {
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        snakeBody: dots
      });
    }
  };

  takeBlock() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let block = this.state.block;
    if (head[0] == block[0] && head[1] == block[1]) {
      this.setState({
        block: plaseBlock()
      });

      let newSnake = [...this.state.snakeBody];
      newSnake.unshift([]);
      this.setState({
        snakeBody: newSnake,
        
      });     
      this.state.score++; 
    }
  }

  snakeOutOfBorder() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  snakeSelfHarm() {
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.gameOver();
      }
    });
  }



  gameOver() {
    alert(`GAME OVER`);    
    this.setState(init);
  }

  render(){
    const { route, snakeBody, block, score} = this.state;
    return (
      <>
        {route === "menu" ? (
           <div class="game-field">   

           <div class="score">
             
           </div>          
          
           <div class="game-area">            
             <Menu startGame={this.startGame} />                 
           </div>
         </div>           
          
          ) : (
            <div class="game-field">   

              <div class="scoreBoard">
                <h3>Score</h3>
                <h2>{score}</h2>
              </div>          
             
              <div class="game-area">            
                <Snake snakeBody={snakeBody} />
                <Block block={block} />                  
              </div>
            </div>            
          )
        }
        
       
      </>
    )
  }

}

export default App