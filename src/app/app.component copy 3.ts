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
  playTime: any = 0;
  timerId: any;
  timer: number = 0;
  timeInSeconds: number = 0;
  timeInPercent: number = 0;
  videoDuration : number= 0;


  @ViewChild('ssVideo', { static: true }) ssVideo!: ElementRef;

  ngOnInit() { this.playPause() }


  playPause() {
    let video: HTMLVideoElement = this.ssVideo.nativeElement;
    const component = this;
    this.videoDuration = video.duration;
    
    video.addEventListener("timeupdate", function () {
      if (video.currentTime < video.duration) {
          if(video.paused){
            video.play();
            component.startTimer();
          }
          else {
            video.pause();
            component.stopTimer();
            // component.totalTime();
          }
      } else{
      video.pause();
      component.stopTimer();
      // component.totalTime();
      }
    });

    // if (video.paused) {
    //   video.play();
    //   this.startTimer();
    // } else {
    //   video.pause();
    //   this.stopTimer();
    //   // this.totalTime()
    // }
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

    console.log("Total time in Second: " + this.playTime);
    this.timeInSeconds = this.playTime
    this.playTime = (this.playTime / 60).toFixed(2);
    console.log("Total time in Minute: " + this.playTime);
    this.timeInPercent = Math.round((100 * this.timeInSeconds )/this.videoDuration);
    console.log("View Percentage: " + this.timeInPercent + "%");
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.timer = this.timer + 1;
      console.log(Math.floor(this.timer / 60));
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.calculateTime.push(this.timer);
    console.log(this.calculateTime);
    this.timer = 0;
  }

}

