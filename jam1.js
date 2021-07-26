//coordonnees de base de la map + zoom de base
var mymap = L.map('leafset-map').setView([48.11, -1.68], 11);
var mapCircles = [];

//ne pas modifier les variable, sauf l'access totem (à recup sur mapbox)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG9sb2dvdGhvIiwiYSI6ImNrcmVwc2RyZzF1NzAydnF1YzVibTU3enMifQ.Ev-BfVVvxUaKwsXm8iFs4A'
}).addTo(mymap);

function addCircleOnMapForEachRecord(data) {
  console.log(data);
}

//Nettoyage de la map grace aux coordonnees stockés dans le tableau, puis on vide le tableau
function clearMap() {  
  for(var i = 0; i < mapCircles.length; i++)
  {
    mymap.removeLayer(mapCircles[i]);
  }
  mapCircles.length = 0;
}

//Fonction pour recup des donnees via une api externe (ici recuperation des xxx plus recentes)
function getDataByApi(color1, color2, color3) {
    fetch("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-du-trafic-en-temps-reel&q=&rows=1000&sort=datetime&facet=denomination")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      //Mes donnees recup sont dans value

     /* document.getElementById("resultat")
      .innerText = value.records[0].fields.denomination; */
     
      var position;
      var traficStatus;
      
      //Nettoyage de la map puis...
      //pour chaque enregistrement, je recupere la position
      //je trace un cercle sur la map correspondant à la position récupérée
      clearMap();
      value.records.forEach(record => {
        position = record.fields.geo_point_2d;
        traficStatus = record.fields.trafficstatus;
        console.log(record);
        addCircleOnMapForEachRecord("add circle");
        
        //selon le trafic, on trace un cercle d'une couleur differente
        if(position != null){
          if(traficStatus == "freeFlow"){
            var circle = L.circle(position, {
              color: color1,
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
            mapCircles.push(circle);
            console.log(mapCircles);

          } else if(traficStatus == "heavy") {
            var circle = L.circle(position, {
              color: color2,
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
            mapCircles.push(circle);

          } else if (traficStatus == "congested") {
            var circle = L.circle(position, {
              color: color3,
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
            mapCircles.push(circle);

          } else {
            console.log("pas trouvé le trafic status");
          }
        }
      });
     
    })
    .catch(function(err) {
      // gestion des erreur
      console.log("erreur");
    });
  }

 

