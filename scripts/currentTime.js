function localTime() {
    const today = new Date();
    let h = today.getHours();
    let n = h - 12;
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    if(h >= 12){ var meridian = "PM"}
    else{ var meridian = "AM"}
    document.getElementById('txt').innerHTML = n + ":" + m + " " + meridian; 
    setTimeout(localTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }