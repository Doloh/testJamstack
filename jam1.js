function getDataByApi() {
    fetch("https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-du-trafic-en-temps-reel&q=&sort=averagevehiclespeed&facet=denomination")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      //Mes donnees recup sont dans value
        document.getElementById("resultat2")
        .innerText = value.records[0].fields.denomination;

        document.getElementById("resultat3")
        .innerText = "La vitesse moyenne est de " + value.records[0].fields.averagevehiclespeed + " km";          
        
    })
    .catch(function(err) {
      // Une erreur est survenue
      console.log("erreur");
    });
  }
  
  document
    .getElementById("C'est ici que tout commence")
    .addEventListener("click", getDataByApi);