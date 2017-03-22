// document.addEventListener('DOMContentLoaded', function() {
//   let getInterests = (interests) => {
//     fetch('https://s3.amazonaws.com/trivia-extraordinaire/categories.json')
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         let errorMessage = `${response.status} (${response.statusText})`,
//         error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => response.json())
//     .then(body => {
//       interests.forEach((interest) => {
//         body.forEach((category) => {
//           if (category['category'].toLowerCase().include(interest.value.toLowerCase())) {
//             return interest;
//           } else {
//             return "interest not found";
//           }
//         });
//       });
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
//   };
//
//   let interests = document.getElementsByClassName('interests');
//   document.getElementsByClassName('interestSubmit').addEventListener('click', getInterests(interests));
// }, false);
