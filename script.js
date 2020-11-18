const navigationbar = document.createElement("nav");
navigationbar.className = 'navbar';
navigationbar.classList.add("p-0");
navigationbar.classList.add("shadow");
navigationbar.classList.add("justify-content-center");
navigationbar.style = 'background-color: hsl(205, 85%, 41%)'
document.body.appendChild(navigationbar)

const navbarLink = document.createElement('a');
navbarLink.className = "navbar-brand" ;
navbarLink.classList.add("p-0")
navbarLink.classList.add("m-0")
navbarLink.setAttribute("href", "#"); 
navigationbar.appendChild(navbarLink);

const logoimg = document.createElement('img');
logoimg.src = 'imgs/findApic_logo.png'
logoimg.setAttribute("height", "70"); 
navbarLink.appendChild(logoimg);

const banner_img = document.createElement('div');
banner_img.className = 'banner-img shadow container-fluid p-0';
banner_img.style = 'background: url(imgs/searchbar-bg.jpg); background-size: cover;'
document.body.appendChild(banner_img);

const banner_img_layer = document.createElement('div');
banner_img_layer.className = 'bg-img-layer col-sm-12';
banner_img_layer.style = 'background-color: rgb(0, 0, 0 , 0.55);'
banner_img.appendChild(banner_img_layer);

const input_container = document.createElement('div');
input_container.className = 'input-container input-group d-flex justify-content-center';
banner_img_layer.appendChild(input_container);

const Query = document.createElement('input');
Query.className = 'form-control form-control-md col-sm-12 col-lg-8';
Query.id = 'search';
Query.type= "text";
Query.placeholder = 'what are you searching for??';
input_container.appendChild(Query);

const button_ = document.createElement("button");
button_.className = 'input-group-append search-btn btn btn-primary mb-2';
button_.id = 'search-btn';
const text = document.createTextNode("Search");
button_.appendChild(text);
const favicon = document.createElement('i');
favicon.className = 'fa fa-search p-1';
button_.appendChild(favicon)
button_.type = 'button';
input_container.appendChild(button_);

const OutputContainer = document.createElement("div");
OutputContainer.className = 'container-fluid d-flex justify-content-around';
document.body.appendChild(OutputContainer);

const data_container = document.createElement("div");
data_container.className = 'data row d-flex justify-content-center col-sm-12';
OutputContainer.appendChild(data_container);

document.getElementById('search-btn').addEventListener('click',()=>{
       const requestOptions = {
           method: 'GET',
           redirect: 'follow'  
        };
        async function getData(){
            const user_query = document.getElementById('search').value
            console.log(!user_query)
            if(!user_query){
                data_container.innerHTML='';
                const EmptyAlert = document.createElement('div');
                EmptyAlert.className = 'alert alert-danger fade-in shadow col-sm-8 text-center'
                EmptyAlert.style = 'font-weight:bold ;'
                EmptyAlert.innerHTML = 'Search Field Required'
                Query.style='border-color: red !important';
                data_container.appendChild(EmptyAlert);
            }else{ 
                Query.style='';
                const res = await fetch("https://api.unsplash.com/search/photos?query="+user_query+"&client_id=1Dj4HIVcUDdUb6FwUGBdg5ZRNES7rv0Bm6ZYt8mQG9c&per_page=30" , requestOptions);
                const data = await res.json();
                if(data.results.length == 0){
                    data_container.innerHTML='';
                    const noData = document.createElement('div');
                    noData.className = 'alert alert-danger fade-in shadow col-sm-8 text-center'
                    noData.style = 'font-weight:bold ;'
                    noData.innerHTML = 'No collections found with name '+user_query;
                    Query.style='border-color: red !important';
                    data_container.appendChild(noData);
                }else{
                    data_container.innerHTML='';
                    displayData(data);
                }
            }
        }
        getData();
})


function  displayData(data){
    console.log(data)
    const photos = data.results;
    photos.forEach(photo => {
        console.log(photo)
        const photocard = document.createElement('div');
        photocard.setAttribute("class" , "fade-in data-card bg-light col-sm-5 p-0")
        const img_div = document.createElement("div");
        img_div.className = 'data-img';
        photocard.appendChild(img_div);

        const pic = document.createElement('img');
        pic.src = `${photo.urls.regular}`;
        img_div.appendChild(pic);

        const img_des = document.createElement("div");
        img_des.className = 'img-des';
        photocard.appendChild(img_des);

        const title = document.createElement("div");
        title.className = 'img-title text-center p-2';
        title.innerHTML=`${photo.alt_description}`;
        img_des.appendChild(title);

        const author = document.createElement("p");
        author.className = 'likes_download d-flex justify-content-around';
        author.innerHTML= 'Shot By: '+`${photo.user.name}`; 
        title.appendChild(author);

        const likes_download = document.createElement("div");
        likes_download.className = 'likes_download d-flex justify-content-around';
        likes_download.style='height:54px overflow: hidden;';
        photocard.appendChild(likes_download);


        const row = document.createElement("div");
        row.className = 'row col-sm-12 p-0';
        likes_download.appendChild(row);

        const likesdivision = document.createElement("div");
        likesdivision.className = 'download col-sm-6 p-0 m-0';
        row.appendChild(likesdivision);
    
        const downloaddivision = document.createElement("div");
        downloaddivision.className = 'download col-sm-6 p-0 m-0';
        row.appendChild(downloaddivision);

        const likesbutton = document.createElement("button");
        likesbutton.className = 'btn button btn-lg btn-block likes-btn';
        likesbutton.type = 'button';
        likesbutton.innerHTML = `${photo.likes}`+" Likes ";
        const thumbicon = document.createElement("i");
        thumbicon.className = 'fa fa-thumbs-up';
        likesbutton.appendChild(thumbicon);
        likesdivision.appendChild(likesbutton);


        const downloadbutton = document.createElement("button");
        downloadbutton.className = 'btn button btn-lg btn-block download-btn';
        downloadbutton.type = 'button';
        downloadbutton.onclick= () =>{window.location.href=`${photo.links.download}`};
        downloadbutton.innerHTML = 'download';
        const dlicon = document.createElement("i");
        dlicon.className = 'fa fa-download';
        downloadbutton.appendChild(dlicon);
        downloaddivision.appendChild(downloadbutton);
        
        data_container.appendChild(photocard);
    });
}