import { Component, ViewChild, ElementRef } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserAnalytics';

  calculateTime: any = [0]

  currentTime: number = 0;
  playTime: any = 0;

  timerId:any;
  timer: number = 0;
  // isFunctionOneActive = false;

  @ViewChild('ssVideo', { static: true }) ssVideo!: ElementRef;



  // switchFunction() {  
  //   if (this.isFunctionOneActive) {
  //     console.log(this.calculateTime);
  //     clearInterval(this.timerId);
  //     this.calculateTime.push(this.timer);
  //     console.log(Math.floor(this.timer / 60));       
  //     console.log(this.calculateTime);
  //     this.timer = 0;
  //     this.isFunctionOneActive = false;

  //   } else {
  //     console.log(this.calculateTime);
  //     this.timerId = setInterval(() => {
  //     this.timer = this.timer + 1
  //     console.log(Math.floor(this.timer / 60));      
  //   }, 1000);
  //     this.isFunctionOneActive = true;
  //   }
  // }

  ngOnInit() { }


    playPause() {
      
      let video: HTMLVideoElement = this.ssVideo.nativeElement;
      video.addEventListener("timeupdate", function(){
        if(video.currentTime >= 10 ) {
            video.pause();
            // this.stopTimer();
        }
    });
      this.stopTimer();

      if (video.paused) {
        console.log(video.currentTime);
        video.play();
        this.startTimer();
      } else if (video.currentTime > 10) {

        video.addEventListener("timeupdate", function(){
          if(video.currentTime >= 10 ) {
              video.pause();
              // this.stopTimer();
          }
      });
        video.pause();
        this.stopTimer();

      } else {
        video.pause();
        this.stopTimer();
        console.log(video.duration)
      }
    }   

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
    this.stopTimer();
  }
  
  totalTime() {
    this.playTime = this.calculateTime.reduce(function (x: number, y: number) {
      return x + y;
    }, 0);
    
    console.log(this.playTime);
    this.playTime = (this.playTime / 60).toFixed(2);
    console.log(this.playTime);
  }


  startTimer() {
    console.log(this.calculateTime);
    this.timerId = setInterval(() => {
      this.timer = this.timer + 1
      console.log(Math.floor(this.timer / 60));      
    }, 1000);
  } 
  
  stopTimer() {
    console.log(this.calculateTime);
    clearInterval(this.timerId);
    this.calculateTime.push(this.timer);
    console.log(Math.floor(this.timer / 60));       
    console.log(this.calculateTime);
    this.timer = 0;
  }

}
