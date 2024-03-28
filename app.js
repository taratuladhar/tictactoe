let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let clickCount=0;

let turnO= true;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if(turnO){
            box.innerText="O";
            box.classList.add("o-symbol");
            box.classList.remove("x-symbol");
            turnO=false;
        }
        else{
            box.innerText="X";
            box.classList.add("x-symbol");
            box.classList.remove("o-symbol");
            turnO=true;
        }
        box.disabled=true;
        clickCount++;

        checkWinner();
        checkDraw();
    });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText = "";
    }
};

const showWinner = (winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !="")
        {
            if(pos1Val==pos2Val && pos2Val==pos3Val)
            {
                showWinner(pos1Val);
            }
        }
    }
};

const checkDraw=()=>{
    if(clickCount==9 && !checkWinner()){
        showDraw();
    }
};

const showDraw=()=>{
    msg.innerText ="It's a draw!!!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    clickCount=0;
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);