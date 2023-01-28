<template>
  <div>
    <canvas ref="chart" height="500px"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      scrapedData: [],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/')
      .then((response) => {
        this.scrapedData = response.data;
        this.createChart();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chart;
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.scrapedData.map((d) => {
            const { name } = d;
            if (name.length > 15) {
              return `${name.substring(0, 15)}...`;
            }
            return name;
          }),
          datasets: [{
            label: 'Price',
            data: this.scrapedData.map((d) => d.price),
            backgroundColor: 'steelblue',
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      console.log(chart);
    },
  },
};
</script>
