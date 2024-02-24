const fetchData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json()

    // Convert views to numeric values for proper sorting
    data.data.forEach(item => {
        item.others.views = parseFloat(item.others.views.slice(0, -1));
    });

    if (data.data.length == 0) {
        noContent()

    }
    else {
        document.getElementById('short-by-view').addEventListener('click', e => {
            // Sort the data array by views in descending order
            data.data.sort((a, b) => b.others.views - a.others.views);

            // Now 'data' array is sorted by most views
            // console.log(data);

            dataBind(data.data);
            return;
        })
        dataBind(data.data);
    }
}


function noContent() {
    let video_section = document.getElementById('video-section')
    video_section.innerHTML = ""
    let div = document.createElement('div')
    div.classList.add('error-handeler')

    div.innerHTML = `
            <i class="fa-solid fa-video-slash"></i>
            <h2>Oops!! Sorry, There is no content here</h2>
        `;

    video_section.appendChild(div)

}

function formatTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return "";
    }

    const hours = Math.floor(seconds / 3600);

    if (hours > 12) {
        return "";
    }

    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    let result = '';

    if (hours > 0) {
        result += hours + ' hrs ';
    }

    if (minutes > 0) {
        result += minutes + ' min';
    }

    return result.trim() + ' ago';
}


const dataBind = videos => {
    let video_section = document.getElementById('video-section')
    video_section.innerHTML = '';
    videos.forEach(video => {
        let col = document.createElement('div')
        col.classList.add('col')
        col.innerHTML = `
                    <div class="card">
                        <div class="card-thumbnail">
                            <img src="${video.thumbnail}" class="card-img-top" alt="...">
                            <div class="card-time">${formatTime(parseInt(video.others.posted_date))}</div>
                        </div>

                        <div class="card-body">
                            <div class="card-body-top d-flex">
                                <div class="profile" style="background-image: url(${video.authors[0].profile_picture})">

                                </div>
                                <h5 class="card-title">${video.title}</h5>
                            </div>

                            <div class="card-body-bottom">
                                <h6 class="user-name">${video.authors[0].profile_name} ${video.authors[0].verified ? '<i class="fa-solid fa-circle-check verify" style="color: #74C0FC;"></i>' : ''}</h6>
                                <h6 class="views"> ${video.others.views}k views</h6>
                            </div>

                        </div>
                    </div>
                `
        video_section.appendChild(col)

    });
}



function main() {
    const navItems = document.querySelectorAll('.nav-btn');

    // Add click event listener to each nav-btn
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function () {
            // Remove active class from all nav-btns
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked nav-btn
            this.classList.add('active');
        });
    });


    window.addEventListener('load', e => {
        fetchData(1000)
    })

    document.getElementById('all').addEventListener('click', e => {
        fetchData(1000)
    })

    document.getElementById('music').addEventListener('click', e => {
        fetchData(1001)
    })

    document.getElementById('comedy').addEventListener('click', e => {
        fetchData(1003)
    })

    document.getElementById('drawing').addEventListener('click', e => {
        fetchData(1005)
    })



}

main()