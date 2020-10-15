<template>  
  <div id="chart" style="position: relative;">
    <div style="position: absolute; right: 0; z-index: 1">
      <v-btn-toggle v-model="selection" class="mx-3">    
        <v-tooltip v-for="(button, buttonIdx) in buttons" :key="buttonIdx" top>
          <template v-slot:activator="{ on, attrs }">    
            <v-btn small @click="updateData(buttonIdx)" v-bind="attrs" v-on="on">
              {{button.label}}
            </v-btn>
          </template>
          <span>{{button.tooltip}}</span>
        </v-tooltip>        
      </v-btn-toggle>                    
    </div>  
    <div id="chart-timeline">
      <client-only>
        <apexchart type="area" width="100%" height="300" ref="chart" :options="chartOptions" :series="chartSeries"></apexchart>
      </client-only>
    </div>
  </div>              
</template>

<script>
import dashBoardPanel from '~/components/dashBoardPanel.vue';

export default {
  data() {
    return {            
      buttons: [
        {label: this.$t('usage.oneMonthShort'), tooltip: this.$t('usage.oneMonth')},
        {label: this.$t('usage.sixMonthsShort'), tooltip: this.$t('usage.sixMonths')},
        {label: this.$t('usage.oneYearShort'), tooltip: this.$t('usage.oneYear')},
        {label: this.$t('usage.yearToDateShort'), tooltip: this.$t('usage.yearToDate')},
        {label: this.$t('usage.allShort'), tooltip: this.$t('usage.all')}
      ],
      chartRange: {
        min: 0,
        max: 0
      },      
      chartOptions: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 350,
          zoom: {
            // autoScaleYaxis: true
          },
          toolbar: {
            show: false,
          },     
          events: {
            mounted: (chartContext, {config}) => {
              console.log(config.xaxis);
              this.chartRange.min = config.xaxis.min;
              this.chartRange.max = config.xaxis.max;
            },
            updated: (chartContext, {config}) => {
              console.log(config.xaxis);
              this.chartRange.min = config.xaxis.min;
              this.chartRange.max = config.xaxis.max;
            },
            zoomed: (chartContext, { xaxis, yaxis }) => {
              this.selection = null;
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        legend: {
          show: true,
          position: 'top',          
          horizontalAlign: 'left',
          onItemClick: {
            toggleDataSeries: true
          },
        },
        colors:['#F57C00', '#008FFB'],
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          min: this.$moment().startOf('year').toDate().getTime(),
          max: new Date().getTime(),
          tickAmount: 6,
          tooltip: {
            enabled: false
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#F57C00'
            },
            labels: {
              style: {
                colors: '#F57C00',
              }
            },
            title: {
              text: this.$t('usage.pagesRemaining'),
              style: {
                color: '#F57C00',
              }
            },
            tooltip: {
              enabled: false
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: this.$t('usage.pagesUsed'),
              style: {
                color: '#008FFB',
              }
            },
          },          
        ],
        tooltip: {
          x: {
            format: 'dd MMM yyyy'
          }
        },          
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      },          
      selection: 3,
    }
  },
  components: {
    dashBoardPanel
  },
  computed: {
    chartSeries: function(){
      return [      
        { 
          name: this.$t('usage.pagesRemaining'), 
          data: this.$store.state.usage.pagesRemaining
        },
        {
          name: this.$t('usage.pagesUsed'),
          data: this.$store.state.usage.pagesUsed
        }
      ];
    },
    minDate: function(){
      return Math.min(this.chartSeries?.[0]?.data?.[0]?.[0], this.chartSeries?.[1]?.data?.[0]?.[0]);
    }

  },
  methods: {
    updateData: function(timeline) {
      this.selection = timeline
  
      switch (timeline) {
        case 0:
          this.$refs.chart.zoomX(
            this.$moment(this.chartRange.max).subtract(1, 'month').toDate().getTime(),
            this.chartRange.max            
          )
          break;
        case 1:
          this.$refs.chart.zoomX(
            this.$moment(this.chartRange.max).subtract(6, 'months').toDate().getTime(),
            this.chartRange.max            
          )
          break;
        case 2:
          this.$refs.chart.zoomX(
            this.$moment(this.chartRange.max).subtract(1, 'year').toDate().getTime(),
            this.chartRange.max            
          )
          break
        case 3:
          this.$refs.chart.zoomX(
            this.$moment().startOf('year').toDate().getTime(),
            new Date().getTime()
          );
          break
        case 4:
          this.$refs.chart.zoomX(
            this.minDate,
            new Date().getTime()
          );          
          break
        default:
      }
    }
  }
}
</script>
