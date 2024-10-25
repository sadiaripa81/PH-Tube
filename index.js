const blogBtnClicked = () => {
    console.log("blog")
    document.getElementById('blog-btn')
    window.location.href = 'blog.html';
}


const loadVideos = async (categoryId) => {
    displayVideos([])
    isloading=true
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const videos = data.data;
    // console.log(data.data);
    displayVideos(videos)
}

let selectedCategory

const handleCategoryClick = (categoryId) => {
    loadVideos(categoryId);
    selectedCategory = categoryId

    // button style
    const allButton = document.getElementById('all-btn')
    const musicButton = document.getElementById('music-btn')
    const comedyButton = document.getElementById('comedy-btn')
    const drawingButton = document.getElementById('drawing-btn')

    if (selectedCategory == 1000) {
        allButton.style.background = '#ef4444';
    }
    else {
        allButton.style.background = '#cbd5e1';
    }

    if (selectedCategory == 1001) {
        musicButton.style.background = '#ef4444';
    }
    else {
        musicButton.style.background = '#cbd5e1';
    }

    if (selectedCategory == 1003) {
        comedyButton.style.background = '#ef4444';
    }
    else {
        comedyButton.style.background = '#cbd5e1'
    }

    if (selectedCategory == 1005) {
        drawingButton.style.background = '#ef4444';
    }
    else {
        drawingButton.style.background = '#cbd5e1';
    }
}

const displayVideos = videos => {
    // container 
    const videosContainer = document.getElementById('videos-container');

    while (videosContainer.firstChild) {
        videosContainer.removeChild(videosContainer.firstChild);
    }
    console.log(videos);
    if (videos.length > 0) {
        videos.forEach(video => {
            // console.log(video);

            // creating div card 
            const videosCard = document.createElement('div');
            videosCard.classList = `card bg-base-100`;
            // setting inner HTML 
            videosCard.innerHTML = `
            <div class="h-80 rounded-lg">
    
                <figure class="h-2/3 rounded-lg"><img class="w-full" src="${video.thumbnail}" /></figure>
                
                <div class="flex gap-3 pt-3 h-1/3 relative">
                    <div class="w-14 h-14"><img class="rounded-full w-fit" src="${video?.authors[0]?.profile_picture}" alt='pp' /></div>
    
                    <div>
                        <h2 class="title font-bold text-base text-black">${video.title}</h2>
                        <div class="flex gap-3">
                            <p class="profile_name font-normal text-sm text-gray-600">${video?.authors[0]?.profile_name}</p>
                            <div class="verified-mark"> ${video?.authors[0]?.verified ? `<img src="./photos/fi_10629607.png" alt="icon">` : ''}
                            </div>
                        </div>
                    <p class="views text-sm font-normal text-gray-600">${video?.others?.views} Views</p>
                    <p class="absolute right-3 bottom-28 text-sm text-gray-100 bg-slate-900">${video?.others?.posted_date}</p>
                </div>
            </div>
            `;
            // append child 
            videosContainer.appendChild(videosCard);
        })
    }
    else {
        // console.log('in else')
        const noVideosCard = document.createElement('div');
        noVideosCard.classList = `grid col-span-4 items-center justify-center`;
        noVideosCard.innerHTML = `
        <figure class="flex items-center justify-center py-12"><img class="w-36" src="./photos/Icon.png" /></figure>
        <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no content here</p>
        `;
        videosContainer.appendChild(noVideosCard)
    }

}

loadVideos(1000);
