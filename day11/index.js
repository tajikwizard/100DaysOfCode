// Callbacks
// function fetchData(url, callback) {
//   console.log("We are waiting for 2 seconds");
//   setTimeout(() => {
//     const data = { id: 1, name: "Abdulaziz" };
//     callback(data);
//   }, 2000);
// }

// fetchData("http://localhost.com/api", (data) => {
//   console.log(data);
// });

//Promises
// function fetchData(url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = { id: 1, name: "Abdulaziz" };
//       //   reject("Error while fetching data");
//       resolve(data);
//     }, 2000);
//   });
// }
// fetchData("http://localhost/api/")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

//Async and await
// async function fetchData(url) {
//   try {
//     console.log("fetchin data...");
//     const data = await fetch("http://localhost/api/");
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }
// fetchData();
