const data_container = document.getElementById('data-container')
document.getElementById('search-btn').addEventListener('click',()=>{
    //    const user_query = document.getElementById('search').value;
       const requestOptions = {
           method: 'GET',
           redirect: 'follow'  
        };
        async function getData(){
            const user_query = document.getElementById('search').value
            const res = await fetch("https://api.unsplash.com/search/photos?query="+user_query+"&client_id=1Dj4HIVcUDdUb6FwUGBdg5ZRNES7rv0Bm6ZYt8mQG9c&per_page=30" , requestOptions);
            const data = await res.json();
            // console.log(data);
            displayData(data);
        }
        getData()
})


function  displayData(data){
    data_container.innerHTML='';
    const photos = data.results;
    photos.forEach(photo => {
        const photocard = document.createElement('div');
        photocard.className = 'data-card';
        photocard.classList.add('bg-light');
        photocard.classList.add('col-sm-5');
        // photocard.classList.add('m-1');
        photocard.classList.add('p-0');
        photocard.innerHTML =  `
            <div class="data-img">
            <img src="${photo.urls.full}" alt="">
        </div>
        <div class="img-des">
            <div class="img-title text-center p-2" style='height:100px'>
                ${photo.alt_description}
                <p class="img-author">
                    Shot By: ${photo.user.name}
                </p>
            </div>
        </div>
        <div class="likes_download d-flex justify-content-around" style='height:54px overflow: hidden;'>
            <div class="row col-sm-12 p-0 ">
                <div class="download col-sm-6 p-0 m-0">
                    <button class="btn button btn-lg btn-block likes-btn" type="button">
                        ${photo.likes} Likes
                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="download col-sm-6 p-0 m-0" >
                    <button onclick="window.location.href="${photo.links.download}" class="btn button btn-lg btn-block download-btn" type="button">
                        Download
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        data_container.appendChild(photocard);
    });
}