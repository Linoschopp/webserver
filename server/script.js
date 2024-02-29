const str_times = [ // Uhrzeiten für die Anzeige im String-Format
  "08-10",
  "08-37",
  "09-00",
  "09-45",
  "10-01",
  "10-05",
  "10-50",
  "10-55",
  "11-40",
  "11-51",
  "11-55",
  "12-40",
  "12-45",
  "13-30",
  "13-52",
  "13-55",
  "14-40",
  "14-45",
  "15-30"  
];

let texts = [ // Texte für die Anzeige im String-Format
  "bis zum Unterricht",
  "bis zur 5 Minuten Pause",
  "bis zum Unterricht",
  "bis zur großen Pause",
  "bis zum Pausenende",
  "bis zum Unterricht",
  "bis zur 5 Minuten Pause",
  "bis zum Unterricht",
  "bis zur großen Pause",
  "bis zum Pausenende",
  "bis zum Unterricht",
  "bis zur 5 Minuten Pause",
  "bis zum Unterricht",
  "bis zum Schulschluss/Mittagspause",
  "bis zum Pausenende",
  "bis zum Unterricht",
  "bis zur 5 Minuten Pause",
  "bis zum Unterricht",
  "bis zum Schulschluss"
];

let good = [ // Die guten Uhrzeiten 
  "08-30",
  "09-45",
  "10-50",
  "11-40",
  "12-40",
  "13-30",
  "14-40",
  "15-30"
];

let isGood = false // Ist es eine gute Uhrzeit?

let times = [] // Die Uhrzeiten als Array als Date-Objekte

for (let index = 0; index < str_times.length; index++) { // Wandelt die Uhrzeiten in Date-Objekte um
  let d = str_times[index]
  d = d.split("-");
  let da = new Date();
  da.setSeconds(0);
  da.setMinutes(parseInt(d[1]));
  da.setHours(parseInt(d[0]))
  times.push(da);
  
}
let good_dates = [] // Die guten Uhrzeiten als Array als Date-Objekte

for (let index = 0; index < good.length; index++) { // Wandelt die guten Uhrzeiten in Date-Objekte um
  let d = good[index]
  d = d.split("-");
  let da = new Date();
  da.setSeconds(0);
  da.setMinutes(parseInt(d[1]));
  da.setHours(parseInt(d[0]));
  good_dates.push(da);
}
var display = document.getElementById('disp'); // Display
var box = document.getElementById('box'); // Box
function show() { // Funktion zum Anzeigen der Uhrzeiten
  
  let now = new Date();
  for (let i = 0; i < times.length; i++) {
    if (times[i] - now < -20000) {
      continue;
    }
    var t = texts[i]
    var dt = times[i];
    for (let i = 0; i < good_dates.length; i++) {
       if (dt - good_dates[i] == 0) {
         display.style.color = "darkgreen"
         isGood = true
         break;
       } else {
         display.style.color = "darkred"
         isGood = false
       }
    }
    break;
  }
  let minutes = String(Math.floor((dt - now) /60000))
  if (minutes.length == 1) {
    minutes = "0" + minutes
  }
  let seconds = String(Math.floor((dt - now)/1000) - 60*minutes);
  
  if (seconds.length == 1) {
    seconds = "0" + seconds
  }
  
  if (dt - now > 0) {
    if (dt - now < 60000) {
      milli = String(Math.floor((dt - now)) % 1000)
      while (milli.length < 3) {
        milli = "0" + milli
      }
      display.innerHTML = seconds + "," + milli
      if (dt - now < 20000 && dt - now >= 10000) {
        if (milli < 500) {
          if (isGood) {
            box.style.backgroundColor = "rgba(148, 220, 148, 0.7)"
          } else {
            box.style.backgroundColor = "rgba(220, 148, 148, 0.7)"
          }
        } else {
          box.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }
      } else if (dt - now < 10000 & dt - now >= 5000) {
        if (milli % 100 < 50) {
          if (isGood) {
            box.style.backgroundColor = "rgba(148, 220, 148, 0.7)"
          } else {
            box.style.backgroundColor = "rgba(220, 148, 148, 0.7)"
          }
        } else {
          box.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }
      } else if (dt - now < 5000) {
        if (milli % 10 < 5) {
          if (isGood) {
            box.style.backgroundColor = "rgba(148, 220, 148, 0.7)"
          } else {
            box.style.backgroundColor = "rgba(220, 148, 148, 0.7)"
          }
        } else {
          box.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
        }
      }
    } else {
    display.innerHTML = minutes + ":" + seconds
    box.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
    }
    document.getElementById('info').innerHTML = "Noch";
    document.getElementById('Text').innerHTML = t;
    
  }
  else {
    document.getElementById('info').innerHTML = "Es ist";
    document.getElementById('Text').innerHTML = t.slice(7);
    if (isGood) {
      display.innerHTML = "&#9989;"
      box.style.backgroundColor = "rgba(128, 200, 128, 0.7)"
    } else {
      display.innerHTML = "&#10060;"
      box.style.backgroundColor = "rgba(200, 128, 128, 0.7)"
    }
  }
}

setInterval(show, 1)
