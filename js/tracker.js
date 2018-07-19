var xhttp = new XMLHttpRequest();

$(document).ready(function() {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var element = $("#curinv")[0];
            var data = JSON.parse(xhttp.responseText);
            var noinv = true;
            var indx = 0;
            $.each(data, function(i, o) {
                if (o.cogs_attacking != 'None' && Math.round(o.remaining_time)!=0) {
                    noinv = false;
                    var newElement = `<section id="${indx%2==0?'card-left':'card-right'}">
<img draggable="false" class="cog" src="https://raw.githubusercontent.com/Toonkit/Website/master/assets/images/cogs/${o.cogs_attacking.toLowerCase().replace(/ /g,'_')}.png">
                <h2>${o.cogs_attacking}</h2>
                <h3>${o.name}</h3>
                <p>${o.count_defeated}/${o.count_total} Cogs | <b>${Math.round(o.remaining_time/60)}</b> minutes remaining</p>
 </section>`;
                    element.insertAdjacentHTML('beforeend', newElement);
                    indx++;
                }
            });
            if (noinv) 
                $("#noinv").show();
            else 
                $("#noinv").hide();
        }
    };
    updateInvasions();
    setInterval(()=>updateInvasions(),60000);
});

function updateInvasions() {
    $("#curinv").html('');
    xhttp.open("GET", "https://corporateclash.net/api/v1/districts?_=" + new Date().getTime(), true);
    xhttp.send();
}
