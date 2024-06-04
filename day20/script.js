let income = document.getElementById("income");
const outcome = document.getElementById("outcome");
const interest = document.getElementById("interest");
const sortBtn = document.getElementById("sort");

const transfer_btn = document.getElementById("transfer_btn");

const accounts = [
  {
    owner: "Abdusamadzoda Abdulazizi Abdurasul",
    movements: [200, 450, -130],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: "Hanonov Abdurasul Abdulmanonovich",
    movements: [100, -50, 620],
    interestRate: 1.5,
    pin: 2222,
  },
];
function createUsername(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}
createUsername(accounts);
const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const userObj = JSON.parse(user);
    const currentUser = accounts.find(
      (user) => user.username === userObj.username
    );
    return currentUser;
  } else {
    return false;
  }
};
const currentUser = getUser();
console.log(currentUser);

transfer_btn.addEventListener("click", function (e) {
  e.preventDefault();
  const transfer_name = document.getElementById("transfer_name").value;
  const transfer_amount = document.getElementById("transfer_amount").value;

  const account = accounts.find((acc) => acc.username === transfer_name);
  if (account) {
    account.movements.push(+transfer_amount);

    // Deduct transferred amount from current user's balance
    currentUser.movements.push(-transfer_amount);

    // Update current user's balance
    const currentUserBalance = currentUser.movements.reduce(
      (acc, curr) => acc + curr,
      0
    );
    transactions(currentUser.movements);
    transactions(account.movements);
    alert("Transfer success!");
  }
});
console.log(currentUser.movements);
function sortTransactions(transactions) {
  return transactions.slice().sort(function (a, b) {
    return a - b;
  });
}

function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function isAuth(accounts, { username, password }) {
  const user = accounts.find(
    (acc) => acc.username === username && acc.pin === parseInt(password)
  );
  if (user) {
    console.log("Logged in: " + username);
    saveUserToLocalStorage({ username: user.username }); // Save only necessary data
    displayAccount(user);
  } else {
    console.log("Wrong credentials");
  }
}

function checkLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    console.log("User already logged in");
    const loggedInUser = accounts.find((acc) => acc.username === user.username);
    if (loggedInUser) {
      displayAccount(loggedInUser);
    } else {
      console.log("User not found");
    }
  } else {
    console.log("User not logged in");
  }
}

window.addEventListener("load", checkLoggedIn);

function displayAccount(user) {
  const welcome = document.getElementById("welcome");
  welcome.innerHTML = `Welcome ${user.owner}`;
  const main = document.getElementById("main");
  main.style.opacity = 100;
  transactions(user.movements);
}

function transactions(movements) {
  const history = document.querySelector(".history_transactions");
  if (!history) {
    console.log("Transaction history container not found");
    return;
  }
  // Clear previous transactions
  history.innerHTML = "";
  let totalBalance = 0;
  let totalWithdrawals = 0; // Variable to store total withdrawals
  movements.forEach((element, i) => {
    const type = element > 0 ? "deposit" : "withdrawal";
    const amount = element > 0 ? element : -element;
    const sign = element > 0 ? "" : "-";
    const color = element > 0 ? "green" : "red";
    const html = `
      <div class="transaction">
        <span class="${type}" style="color: ${color}">${i + 1} ${type}</span>
        <span>3 days ago</span>
        <span style="color: ${color}">${sign}${amount} $</span>
      </div>`;
    history.insertAdjacentHTML("afterbegin", html);
    totalBalance += element;
    if (element < 0) {
      totalWithdrawals += Math.abs(element); // Add the absolute value of negative movements
    }
  });
  const balance = document.getElementById("balance");
  balance.textContent = `${totalBalance} $`;

  income.textContent = `${totalBalance} $`;

  const outcomeElement = document.getElementById("outcome");
  outcomeElement.textContent = `${totalWithdrawals} $`;

  const interestElement = document.getElementById("interest");
  const interestRate = 0.01;
  const interestAmount = totalBalance * interestRate;
  interestElement.textContent = `${interestAmount} $`;
}

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const pin = document.getElementById("password").value;
  isAuth(accounts, { username, password: pin });
});

const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("user");
  location.reload();
  console.log("User logged out");
});

sortBtn.addEventListener("click", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const found = accounts.find((acc) => acc.username === user.username);
    if (found) {
      const transactionArr = found.movements;
      const sortedTransactions = sortTransactions(transactionArr);
      transactions(sortedTransactions);
    }
  }
});
