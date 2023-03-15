/*Pseudocoding for Netflix-and-Chill
-This file will contain these components and functions

-The following APIs will be called to perform specific functions

-Expected behavior
--When a user makes an API call they can save this data to local 
----storage and send that data through email to a friend
--If the API does not retrieve the correct data or response error
----there will be a message on screen to inform them

-uNoGS (unofficial Netflix online Global Search)
--This API allows us to get metadata about Netlix movies and shows
--Parameters
---'title' search by title
---'genre_list' search by genre
---'country_list' US is '78'

-Functions
--Function to call uNoGS API
--Function to save the Netflix playlist to local storage
--Function to populate movie results on screen
*/

//Jquery wrapper
$(function(){
  //Jquery handler function
  $(document).ready(function(){
    //Event listener for search button
    $('#searchBtn').click(function(event) {
      //Function code provided by API with parameters included
      //Parameters included: 20 results PP, US country limit
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '0d055c8f5cmsh911d3bd3fd0acf3p1394b3jsn4a88133a76fd',
          'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
        }
      };

      

      //Fetch API call to uNoGS
      fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=20&order_by=date&country_list=78&title='+$('#searchText').val(), options)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          populateResults(response);
          contentData = response;
        })
        .catch(err => console.error(err));

        var contentData;
       

      //Function to populate movie results on screen
      var populateResults = function (titles){
        console.log(titles.results[0]);
        if (titles.length === 0) {
          
        }
        //For loop to parse each result and relevant data
        for (i = 0; i < titles.results.length; i++) {
          
          
          var resContent = document.createElement('article')
          resContent.classList = 'tile is-child box is-4'
          resContent.style.margin = "5% 5%"
          $(resContent).attr('id', 'title'+i);

          var titleArea = $('#resultArea');
          
          //These are variables to store the HTML formatting for cards
          var titleName = '<br><p class="title">Title: ' + titles.results[i].title + '</p>';
          var synopsis = '<br><p class="content">Description: ' + titles.results[i].synopsis + '<br></p>';
          var poster = '<figure class="media-left"><p class="image is-64x64"><img src="' + titles.results[i].img + '"></p></figure>';
          var saveBtn = '<div class="control"><button class="button is-primary">Save</button></div>'

          //resList.append(poster,titleName,synopsis);
          $(resContent).html(poster+titleName+synopsis+saveBtn)
          
          //resList.addClass('is-flex');
          titleArea.append(resContent);
        }
      }

      //Function to save the Netflix playlist to local storage
      $('#resultArea').on('click','button',function(event) {
          event.preventDefault();

          //console.log($(this))
          var titleSave = {
            title: $(this).parent().prevAll().eq(2).text(),
            synopsis: $(this).parent().prevAll().eq(0).text(),
            poster: $(this).parent().prevAll().eq(4).find('img').attr('src')
          }
          //console.log($(this).parent().prevAll().eq());
          //console.log($(this).parent().prevAll().eq(4).find('img').attr('src'));

          localStorage.setItem('savedMovie', JSON.stringify(titleSave));
          console.log(JSON.parse(localStorage.getItem('savedMovie')))
        
      }); 

    });
  });

});

