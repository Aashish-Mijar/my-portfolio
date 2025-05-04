let userScore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#com-score");

const drawGame=()=>{
    console.log("Game was draw.");
    msg.innerText="Draw! play again.";
    msg.style.backgroundColor="rgb(26, 26, 82)";
}

const showWinner=(userWin, userChoice, comChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        console.log("You win!");
        msg.innerText=`You Win! Your ${userChoice} beats ${comChoice}`;
        msg.style.backgroundColor="green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        console.log("You lose!");
        msg.innerText=`You Lose! ${comChoice} beats ${userChoice}`;
        msg.style.backgroundColor="red";
    }
}


const compChoice=()=>{
    const options=["scissors", "paper", "rock"];
    const randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}



const playGame=(userChoice)=>{
// console.log("user choice = ", userChoice);
const comChoice=compChoice();
console.log("comp choice = ", comChoice);

if(userChoice===comChoice){
    drawGame();
}else{
    let userWin=true;
    if(userChoice=="rock"){
        userWin=comChoice==="paper" ? false: true;
    }
    else if(userChoice==="paper"){
        userWin=comChoice==="scissor"? false: true;
    }
    else{
    userWin=comChoice==="rock"? false: true;
    }
    showWinner(userWin, userChoice, comChoice);
}
}


choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        // console.log("Choice was Clicked!", userChoice);
        playGame(userChoice);
    });
})