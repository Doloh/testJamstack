//coordonnees de base de la map + zoom de base
var mymap = L.map('leafset-map').setView([48.11, -1.68], 11);

//ne pas modifier les variable, sauf l'access totm (à recup sur mapbox)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG9sb2dvdGhvIiwiYSI6ImNrcmVwc2RyZzF1NzAydnF1YzVibTU3enMifQ.Ev-BfVVvxUaKwsXm8iFs4A'
}).addTo(mymap);

//ajouter un cercle
/*var circle = L.circle([48.1161905395, -1.71854551066], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 20
}).addTo(mymap);*/
//

//Fonction pour recup des donnees via une api externe (ici recuperation des 1000 plus recentes)
function getDataByApi() {
    fetch("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-du-trafic-en-temps-reel&q=&rows=1000&sort=averagevehiclespeed&facet=denomination")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      //Mes donnees recup sont dans value
     /* document.getElementById("resultat")
      .innerText = value.records[0].fields.denomination; */
     
      //pour chaque enregistrement, je recupere la position
      //je trace un cercle sur la map correspondant à la position récupérée
      var position;
      var traficStatus;

      value.records.forEach(record => {
        position = record.fields.geo_point_2d;
        traficStatus = record.fields.trafficstatus;
        console.log(record);
        
        //selon le trafic, on trace un cercle d'une couleur differente
        if(position != null){
          if(traficStatus == "freeFlow"){
            var circle = L.circle(position, {
              color: 'green',
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
          } else if(traficStatus == "heavy") {
            var circle = L.circle(position, {
              color: 'orange',
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
          } else if (traficStatus == "congested") {
            var circle = L.circle(position, {
              color: 'red',
              fillColor: '',
              fillOpacity: 0.3,
              radius: 50
            }).addTo(mymap);
          } else {
            console.log("pas trouvé le trafic status");
          }
        }
      });
     
    })
    .catch(function(err) {
      // Une erreur est survenue
      console.log("erreur");
    });
  }
  
  //On recupere le bouton et on declenche la fonction de recup de donnees au clic
  document
    .getElementById("refresh")
    .addEventListener("click", getDataByApi);


  //pour chaque element dont la denomination est differente et le predefinedLocationReference est diff (finit par D pour dorit ou G pour gauche)
  //je recup le dernier element en date
  //j'affiche sa denomination
  //j'affiche la map (j'envois coordonnées via une fonction )
  //selon la qualité du trafic, je trace le chemin de differentes couleurs
  //j'affiche eventuellement d'autres info