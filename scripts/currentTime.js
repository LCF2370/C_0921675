function startTime() {
    const today = new Date();
    let h = today.getHours();
    let n = h - 12;
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    if(h >= 12){ var l = "PM"}
    else{ var l = "AM"}
    document.getElementById('txt').innerHTML = n + ":" + m + " " + l; 
    setTimeout(startTime, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }