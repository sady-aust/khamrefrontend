import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit {
  public cattleId:any;
  constructor(private myDataService: DataService, private route: ActivatedRoute) {
  }
  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'X_Value'},
    {data: [], label: 'Y_Value'},
    {data: [], label: 'Z_Value'},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: -60,
          max: 60
        }
      }]
    }

  };
  public lineChartColours: Array<any> = [
    { // grey
      //backgroundColor: 'rgb(50,177,107)',
      borderColor: 'rgb(82,177,97)',
     // pointBackgroundColor: 'rgba(148,159,177,1)',
     // pointBorderColor: '#fff',
    //  pointHoverBackgroundColor: '#fff',
     // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      //backgroundColor: 'rgb(65,42,50)',
      borderColor: 'rgb(66,60,96)',
     // pointBackgroundColor: 'rgba(77,83,96,1)',
      //pointBorderColor: '#fff',
     // pointHoverBackgroundColor: '#fff',
      //pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
     // backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';
  public currentTemperature: any = "0.0";
  public  currentTime :String = new Date().toLocaleTimeString();



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cattleId = params['cattleid']
      setInterval(()=>{

        let currentData;
        this.myDataService.getActivity(this.cattleId).subscribe(data=>{
          currentData = data;
        },(err)=>{
          console.log(err);
        },()=>{
       //   console.log(currentData);
          //console.log(new Date(currentData[currentData.length-1].createdAt))


          this.lineChartData[0].data.push(currentData.x_value);
          this.lineChartData[1].data.push(currentData.y_value);
          this.lineChartData[2].data.push(currentData.z_value);
          this.lineChartLabels.push(new Date(currentData.createdAt).toLocaleTimeString());

          if( this.lineChartData[0].data.length>8){
            this.lineChartData[0].data.shift();
            this.lineChartData[1].data.shift();
            this.lineChartData[2].data.shift();
            this.lineChartLabels.shift();
          }



          this.currentTemperature = currentData.temp_value;
          this.currentTime = new Date(currentData.createdAt).toLocaleTimeString()

        });
      },1000);


    }, (err) => { }, () => {
      // this.chartDatasets = [
      //   { data: [this.notificationDetails.successCount, this.notificationDetails.clickedCount, this.notificationDetails.failedCount] }
      // ];
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
