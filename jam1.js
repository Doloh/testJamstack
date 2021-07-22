function getDataByApi() {
    fetch("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-du-trafic-en-temps-reel&q=&sort=averagevehiclespeed&facet=denomination")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        document.getElementById("resultat2")
        .innerText = value.records[0].fields.denomination;

        document.getElementById("resultat3")
        .innerText = "La vitesse moyenne est de " + value.records[0].fields.averagevehiclespeed + " km";          
        //value correspond aux data recup, ici un json
        //je reçois un tableau d'enregistrement, à l'emplacement 0 je recup le datasetid
    })
    .catch(function(err) {
      // Une erreur est survenue
      console.log("erreur");
    });
  }
  
  document
    .getElementById("C'est ici que tout commence")
    .addEventListener("click", getDataByApi);