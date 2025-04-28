const price = 19.5;
let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

document.getElementById("purchase-btn").addEventListener("click", () => {
    const cash = parseFloat(document.getElementById("cash").value);
    const changeDueElement = document.getElementById("change-due");

    if(isNaN(cash) || cash < price) {
        alert("Customer does not have enough money pruchase the item");
        return;
    }

    if(cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }

    let changeDue = parseFloat((cash - price).toFixed(2));
    let totalCID = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));

    if(totalCID < changeDue) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    if(totalCID === changeDue) {
        let filteredCID = cid.filter(entry => entry[1] > 0);
        let changeString = filteredCID.map(entry => `${entry[0]}: $${entry [1].toFixed(2)}`).join(" ");
        changeDueElement.textContent = `Status: CLOSED ${changeString}`;
        return;
    }

    let changeArray = [];
    let remainingChange = changeDue;
    const reversedCID = [...cid].reverse();

    for(let [unit, amount] of reversedCID) {
        let unitValue = currencyUnit[unit];
        let amountAvilable = amount;
        let amountToReturn = 0;

        while(remainingChange >= unitValue && amountAvilable >= unitValue) {
            amountToReturn += unitValue;
            amountAvilable -= unitValue;
            remainingChange -= unitValue;
            remianingChange = parseFloat(remainingChange.toFixed(2));
        }
    
        if(amountToReturn > 0) {
            changeArray.push([unit, parseFloat(amountToReturn.toFixed(2))]);
        }
    }

    if(remainingChange > 0) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let changeString = changeArray.map(entry => `${entry[0]}: $${entry[1].toFixed(2)}`).join(" ");
    changeDueElement.textContent = `Status: OPEN ${changeString}`;
})