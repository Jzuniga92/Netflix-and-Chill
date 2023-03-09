/*Pseudocoding for Netflix-and-Chill
-This file will contain these components and functions

-The following APIs will be called to perform specific functions

-Postmail 
--Is fully contained in the HTML

-uNoGS (unofficial Netflix online Global Search)
--This API allows us to get metadata about Netlix movies and shows
--Parameters
---'title' search by title
---'genre_list' search by genre
---'country_list' US is '78'

*/

//Jquery wrapper
$(function(){
  //Jquery handler function
  $(document).ready(function(){

    //Function code provided by API with parameters included
    //Parameters included: 20 results PP, US country limit
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0d055c8f5cmsh911d3bd3fd0acf3p1394b3jsn4a88133a76fd',
        'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
      }
    };
    
    fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=20&order_by=date&country_list=78', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      
  });

});

