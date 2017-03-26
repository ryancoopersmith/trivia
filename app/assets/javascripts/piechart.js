window.onload = function() {
  let user = document.getElementById('user').innerHTML;
  let categories = [];
  fetch(`http://localhost:3000/api/v1/users/${user}/favorite_categories.json`, {
    credentials: 'same-origin'
  }).then(response => {
    if (response.ok) {
      return response;
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
      throw(error);
    }
  }).then(response => response.json())
  .then(body => {
    let dupCategories = [];
    body.forEach((category) => {
      let duplicate = false;
      dupCategories.forEach((dup) => {
        if (dup.category === category.category) {
          duplicate = true;
        }
      });
      if (!duplicate) {
        let count = 0;
        body.forEach((appear) => {
          if (category.category === appear.category) {
            count++;
          }
        });
        categories.push([category.category, count]);
        dupCategories.push(category);
      }
    });
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`));

  let check = () => {
    if (categories[0]) {
      let sortedCategories = categories.sort((a, b) => {
        return b[1] - a[1];
      });

      sortedCategories = sortedCategories.slice(0, 5)
      let total = 0;
      sortedCategories.forEach((category) => {
        total += category[1];
      });

      let categoryLabels = [];
      let categoryColors = ['#FF6384'];
      let categoryHovers = ['#FF6384'];
      let percentages = [];
      sortedCategories.forEach((category, index) => {
        categoryLabels.push(category[0]);
        percentages.push(category[1])
        if (index === 1) {
          categoryColors.push('#36A2EB');
          categoryHovers.push('#36A2EB');
        } else if (index === 2) {
          categoryColors.push('#FFCE56');
          categoryHovers.push('#FFCE56');
        } else if (index === 3) {
          categoryColors.push('#F6F3F2'); // fix color
          categoryHovers.push('#ABCDEF'); // fix hover color
        } else if (index === 4) {
          categoryColors.push('#998FE2'); // fix color
          categoryHovers.push('#223BAC'); // fix hover color
        }
      });

      let ctx = document.getElementById('myChart');
      ctx.width = 200;
      ctx.height = 200;
      let data = {
        labels: categoryLabels,
        datasets: [
          {
            data: percentages,
            backgroundColor: categoryColors,
            hoverBackgroundColor: categoryHovers
          }]
        };

        let myPieChart = new Chart(ctx, {
          type: 'pie',
          data: data,
          options: {
            animation: {
              animateScale: true
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
    } else {
      setTimeout(check, 100);
    }
  };

  check();
};
