const timezones = [
    { name: "UTC-12:00 (Baker Island)", offset: -12 },
    { name: "UTC-11:00 (American Samoa)", offset: -11 },
    { name: "UTC-10:00 (Hawaii)", offset: -10 },
    { name: "UTC-09:00 (Alaska)", offset: -9 },
    { name: "UTC-08:00 (Pacific Time, USA/Canada)", offset: -8 },
    { name: "UTC-07:00 (Mountain Time, USA/Canada)", offset: -7 },
    { name: "UTC-06:00 (Central Time, USA/Canada)", offset: -6 },
    { name: "UTC-05:00 (Eastern Time, USA/Canada)", offset: -5 },
    { name: "UTC-04:00 (Atlantic Time, Canada)", offset: -4 },
    { name: "UTC±00:00 (Greenwich Mean Time)", offset: 0 },
    { name: "UTC+01:00 (Central European Time)", offset: +1 },
    { name: "UTC+02:00 (Eastern European Time)", offset: +2 },
    { name:"UTC+03.00 (Moscow Standard Time)",offset:+3},
   {name:"UTC+04.00 (Gulf Standard Time)",offset:+4},
   {name:"UTC+05.00 (Pakistan Standard Time)",offset:+5},
   {name:"UTC+06.00 (Bangladesh Standard Time)",offset:+6},
   {name:"UTC+07.00 (Indochina Time)",offset:+7},
   {name:"UTC+08.00 (China Standard Time)",offset:+8},
   {name:"UTC+09.00 (Japan Standard Time)",offset:+9},
   {name:"UTC+10.00 (Australian Eastern Standard Time)",offset:+10},
   {name:"UTC+11.00 (Magadan Standard Time)",offset:+11},
   {name:"UTC+12.00 (Fiji, Marshall Islands)",offset:+12}
];

function populateTimezones() {
   const timezoneSelect = document.getElementById('timezone');
   
   timezones.forEach(tz => {
       const option = document.createElement('option');
       option.value = tz.offset; 
       option.textContent = tz.name; 
       timezoneSelect.appendChild(option);
   });
}

function updateTime() {
   const timezoneOffset = parseFloat(document.getElementById('timezone').value);
   
   const now = new Date();
   
   
   const utcTime = new Date(now.toISOString());
   
  
   const localTime = new Date(utcTime.getTime() + timezoneOffset * 3600000);
   
   
   let hours = localTime.getUTCHours();
   const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');
   const seconds = String(localTime.getUTCSeconds()).padStart(2, '0');
   
   // Determine AM or PM suffix
   const ampm = hours >= 12 ? 'PM' : 'AM';
   
   // Convert to 12-hour format
   hours = hours % 12;
   hours = hours ? String(hours).padStart(2, '0') : '12'; // the hour '0' should be '12'
   
   document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
   
   // Format date and day using Intl.DateTimeFormat for the selected timezone
   const options = { weekday:'long', year:'numeric', month:'long', day:'numeric', timeZone:`Etc/GMT${timezoneOffset > 0 ? '-' : '+'}${Math.abs(timezoneOffset)}` };
   const formatter = new Intl.DateTimeFormat('en-US', options);
   
   document.getElementById('date').innerHTML = formatter.format(localTime);
}


populateTimezones();
document.getElementById('timezone').value = -6; 
updateTime();
setInterval(updateTime, 1000);
