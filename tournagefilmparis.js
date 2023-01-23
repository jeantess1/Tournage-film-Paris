
function GetData(){
  var a = document.getElementById("in").value;
  document.getElementById("api-content").innerHTML =""
  document.getElementById("map").innerHTML =""
    const link="https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q="+a+'&rows=100&facet=nom_tournage'
    fetch(link)
      .then(response => response.json())
      .then(data => { 
        const uniqueValues = new Set();
        const coordonnées = new Set();
      
      for(let i=0;i<20;i++){
        try{
          if(!uniqueValues.has(data["records"][i]["fields"]['nom_tournage']) )
          {
            uniqueValues.add(data["records"][i]["fields"]['nom_tournage'])
            coordonnées.add(data["records"][i]["fields"]["geo_point_2d"])
            
          document.getElementById("api-content").innerHTML += "<center>"+data["records"][i]["fields"]['nom_tournage'] + " Producteur: "+data["records"][i]["fields"]['nom_producteur']+"<button onclick=\"getMap("+data["records"][i]["fields"]["geo_point_2d"][0]+","+data["records"][i]["fields"]["geo_point_2d"][1]+")\">Voir sur la carte</button>" +"</center>"+"<br/>"
          }
          
          
        }
        catch{
          break;
        }
      }
      })
      
  
  }
  async function getMap(s2,s3) {
    console.log(s2, s3);
    let s1 = "<h2> Localisation </h2><br><p> Nom du film : "+"</p><iframe width=\"1000\" height=\"790\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"https://www.openstreetmap.org/export/embed.html?bbox=1.7591857910156252%2C48.60067914322632%2C2.7479553222656254%2C48.94685707023662&amp;layer=mapnik&amp;marker=" + s2 + "%2C" + s3 + "\" style=\"border: 1px solid black\"></iframe>";
    document.getElementById("map").innerHTML = s1;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
} 
    var map = L.map('map').setView([48.866667,  2.333333], 13);
  



