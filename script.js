// "use strict"
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list =document.getElementById("list");
const form =document.getElementById("form");
const text = document.getElementById("text");
const amount =document.getElementById("amount");

// const dummyTransactions = [
//     { id:1, text: "Flower", amount:-20},
//     { id:2, text: "salary", amount:300},
//     { id:3, text: "Book", amount:-10},
//     { id:4, text: "camera", amount:150},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions: [];


//add transaction
 function addTransaction(e){
   e.preventDefault();
   if( 
    text.value.trim() === ""|| 
    amount.value.trim()=== "")
    {
    alert ("please Enter Text And amount");
    } else
    {
     const transaction = {
      id: generateid(),
      text:text.value,
      amount:+amount.value,
     }; 

     transactions.push(transaction);
     addTransactionDOM(transaction);
     updatevalues();
     updatelocalStorage();
     text.value = "";
     amount.value = "";

   }
}

//Generate Random ID

function generateid(){
  return Math.floor(Math.random() * 1000000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount <0 ? "-" : "+";
    const item = document.createElement("li");


  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
); 

  item.innerHTML = `
  ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
  list.appendChild(item);

}

//remove Transaction by id

function removeTransaction(id){
  transactions = transactions.filter(transaction=> transaction.id !==id);
  Init();
}


//update the baance income and expense
function updatevalues(){
 const amounts = transactions.map(transaction => transaction.amount);
 const total = amounts.reduce((acc,item)=> (acc += item),0).toFixed(2);
 const income = amounts.filter(item => item > 0 ).reduce((acc,item)=>(acc += item),0).toFixed(2);
 const expanse = (
   amounts.filter(item => item < 0).reduce((acc,item)=> (acc += item),0)*-1
 ).toFixed(2);

 balance.innerText = `₹${total}`;
 money_plus.innerText = `₹${income}`;
 money_minus.innerText = `₹${expanse}`;
}


//Update Local Storage
 function updatelocalStorage(){
     localStorage.setItem(
     "transactions",
     JSON.stringify(transactions)
     );
 }

 //init app


function Init(){
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM) ;
    updatevalues();
  };

Init();


form.addEventListener("submit", addTransaction);