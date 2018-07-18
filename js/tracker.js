updateInvasions();
setInterval(() => {
  updateInvasions();
   }, 60000);
  function updateInvasions() {
             var xhttp = new XMLHttpRequest();
             xhttp.onreadystatechange = function() {
                 if (this.readyState == 4 && this.status == 200) {
                     var element = $('#curinv')[0];
                     var data = JSON.parse(xhttp.responseText);
                     var i = 0;
                     $.each(data, function(i, o) {
                         if (o.cogs_attacking != 'None') {
                             var newElement = `<section id="${i%2==0?'card-left':'card-right'}">
<img draggable="false" src="https://toonhq.org/static/2.4.3/img/cogs/${o.cogs_attacking}.png">
                <h2>${o.cogs_attacking}</h2>
                <h3>${o.name}</h3>
                <p>${o.count_defeated}/${o.count_total} Cogs | <b>${Math.round(o.remaining_time/60)}</b> minutes remaining</p>
 </section>`;
                             element.insertAdjacentHTML('beforeend', newElement);
                         }
                     });
                 };
                 xhttp.open("GET", "https://corporateclash.net/api/v1/districts", true);
                 xhttp.send();
             }
  }