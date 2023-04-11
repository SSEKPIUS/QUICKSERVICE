import colorLib from '@kurkle/color'

export const state = () => ({
  OverallRevenuePerformance: {
    data: {
      labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
      datasets: [
        {
          data: [4, 23, 10]
        }
      ],
      offset: 0,
      borderWidth: 10
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        animateRotate: true,
        duration: 2000
      },
      tooltips: {
        enabled: true // show tooltips
      },
      cutoutPercentage: 80, // cahrt breadth,
      legend: {
        position: 'left',
        labels: {
          boxWidth: 9,
          usePointStyle: true
        }
      }
    }
  },

  TodaysRevenueCollection: {
    data: {
      labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
      datasets: [
        {
          label: 'Projection',
          data: [140, 45, 120],
          borderColor: colorLib('rgb(50,50,50)'),
          backgroundColor: colorLib('rgb(50,50,50)').alpha(0.5).rgbString()
        },
        {
          label: 'Cash',
          data: [140, 45, 110],
          borderColor: colorLib('rgb(250,50,50)'),
          backgroundColor: colorLib('rgb(250,50,50)').alpha(0.5).rgbString()
        },
        {
          label: 'Cash Equivalent',
          data: [0, 0, 10],
          borderColor: colorLib('rgb(50,250,50)'),
          backgroundColor: colorLib('rgb(50,250,50)').alpha(0.5).rgbString()
        }
      ],
      barThickness: 30
    },

    options: {
      plugins: {
        colorschemes: {
          scheme: 'brewer.SetTwo3'
        }
      },
      legend: {
        display: true,
        position: 'top',
        text: 'xxxxxx'
      },
      title: {
        display: true,
        text: "Today's Revenue Collection"
      }
    }
  },

  allMetrics: [
    {
      id: 1,
      title: 'Clients Today',
      value: 6,
      type: 'value',
      increase: false,
      percentage: 32.03,
      visible: true
    },
    {
      id: 2,
      title: 'Orders Today ',
      value: 10,
      type: 'value',
      increase: true,
      percentage: 41.90,
      visible: true
    },
    {
      id: 3,
      title: 'Revenue Today',
      value: 25,
      type: 'value',
      increase: true,
      percentage: 12.90,
      visible: true
    },
    {
      id: 4,
      title: 'Clients Metric',
      value: 40,
      type: 'trend',
      visible: true,
      trendData: {
        labels: ['April 1st', 'April 2nd', 'April 3rd', 'April 4th', 'April 5th', 'April 6th', 'April 7th'],
        datasets: [
          {
            label: 'Customers',
            backgroundColor: 'rgb(245, 250, 253)',
            borderColor: 'rgb(83,162,225)',
            pointBackgroundColor: 'rgba(83, 162, 225, 0.7)',
            borderWidth: 2,
            lineTension: 0,
            data: [30, 42, 26, 40, 43, 32, 38]
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Clients Total',
      value: 0,
      type: 'partition',
      total: 560,
      partitionData: {
        labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
        datasets: [
          {
            data: [4, 23, 10]
          }
        ],
        offset: 0,
        borderWidth: 10
      }
    },
    {
      id: 6,
      title: 'Clients Today',
      value: 0,
      type: 'partition',
      total: 160,
      partitionData: {
        labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
        datasets: [
          {
            data: [4, 23, 10]
          }
        ],
        offset: 0,
        borderWidth: 10
      }
    }
  ]

})

export const getters = {
  getOverallRevenuePerformance: state => state.OverallRevenuePerformance,
  getTodaysRevenueCollection: state => state.TodaysRevenueCollection,
  getAllMetrics: state => state.allMetrics
}

export const actions = {

}

export const mutations = {
  setOverallRevenuePerformance (state, data) {
    state.OverallRevenuePerformance = data
  },

  setTodaysRevenueCollection (state, data) {
    state.TodaysRevenueCollection = data
  },

  setAllMetrics (state, data) {
    state.allMetrics = data
  }
}
