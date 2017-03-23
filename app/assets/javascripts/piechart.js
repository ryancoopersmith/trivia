window.onload = function() {
  let ctx = document.getElementById('myChart');
  ctx.width = 200;
  ctx.height = 200;
  let data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
  };

  let myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      animation: {
        animateScale: true
      },
      responsive: false
    }
  });
};
