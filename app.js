let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1 = prompt("Enter the name of Player1");
let player2 = prompt("Enter the name of Player2");

let turnO = true; //player1 , player2
let count;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>
{
    turnO =true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

}

boxes.forEach((box) =>
{
    box.addEventListener("click",() =>
    {
        if(turnO)
        {
            //player1
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        }
        else
        {
            //player2
            box.innerText = "X";
            box.style.color = "black";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner)
        {
            gameDraw();
        }
    });
});

const gameDraw = () =>
{
    msg.innerText = "Game is Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableBoxes = () =>
{
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>
{
    let winnerName = winner === "O"? player1 : player2;
    msg.innerText = `Congratulations!, Winner is ${winnerName}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () =>
{
    for(pattern of winPatterns)
    {
        let pos1Val =boxes[pattern[0]].innerText;
        let pos2Val =boxes[pattern[1]].innerText;
        let pos3Val =boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val=== pos3Val)
            {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

