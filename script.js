function displaypics(){
    $("#result").empty()
    var search = $("#search").val()
    var url = "https://api.unsplash.com/search/photos?query="+search+"&client_id=1Dj4HIVcUDdUb6FwUGBdg5ZRNES7rv0Bm6ZYt8mQG9c&per_page=30";
    $.ajax({
        method:'GET',
        url:url,
        success:function(data){
               data.results.forEach(item => {
                   $("#result").append(
                       `
                       <img id="items" src="${item.urls.regular}">
                       `
                       )
               }); 
             }
        })

}