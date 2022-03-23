import React, { Component } from "react";
import TutorialsVideo from "../components/TutorialsVideo";

export default class TutorialsPage extends Component {
  render() {
    return (
      <div className="tutorialsPage">
        <TutorialsVideo
          headLine="פתיחת יוזר וחשבון"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkqIRqEJ9yqM3vS_be74i74B"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
        <TutorialsVideo
          headLine="העלאת מוצר"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkoxtg6YV1QI-5IQtOTyM5da"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
        <TutorialsVideo
          headLine="יצירת הזמנה"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkp7LAKAHAh9-pCQy3AcnEA5"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
        <TutorialsVideo
          headLine="סיום הזמנה"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkp9ILZHfR-XdX4lYKTe4tzA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
        <TutorialsVideo
          headLine="אישור הזמנה ספק"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkpAaf3tNp_ojGSCw4eL_KeC"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
        <TutorialsVideo
          headLine="סיכום הזמנה לקוח"
          video={
            <iframe
              width="320"
              height="180"
              src="https://www.youtube.com/embed/videoseries?list=PL07khJ0wlNkpuVrj7xznJ-LT32fb0NEK8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture"
            ></iframe>
          }
        ></TutorialsVideo>
      </div>
    );
  }
}
