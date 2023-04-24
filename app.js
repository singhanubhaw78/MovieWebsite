let left_btn = document.getElementsByClassName("bi bi-chevron-left")[0];
let right_btn = document.getElementsByClassName("bi bi-chevron-right")[0];
let cards = document.getElementsByClassName("cards")[0];
let search = document.getElementsByClassName("search")[0];
let search_input = document.getElementById("search_input");

left_btn.addEventListener("click", () => {
  cards.scrollLeft -= 140; //- means pichhe ko scroll ho 140px
});
right_btn.addEventListener("click", () => {
  cards.scrollLeft += 140; // + se ye aage ki taraf scroll hoga
});
let json_url = "./movie.json"; // yeha sedata fetch karenge
fetch(json_url)
  .then((Response) => Response.json()) //json file hame data dega
  .then((data) => {
    // console.log(data);
    // console.log(typeof(data));

    data.forEach((ele, i) => {
      let { name, imdb, date, sposter, bposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url; //since card element is an anchor element
      card.innerHTML = `
        <img src="${sposter}" class="poster" alt="${name}" />
            <div class="rest_card">
              <img src="${bposter}" alt="" />
              <div class="cont">
                <h4>${name}</h4>
                <div class="sub">
                  <p>${genre},${date}</p>
                  <h3>
                    <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}
                  </h3>
                </div>
              </div>
            </div>
        `;
      cards.appendChild(card);
    });
    // class= content me naam,date,genre... wagaira change karne ke liye

    document.getElementById("title").innerText = data[0].name;
    document.getElementById("gen").innerText = data[0].genre;
    document.getElementById("date").innerText = data[0].date;
    document.getElementById(
      "rate"
    ).innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i>${data[0].imdb}`;

    // .search_user,search,card
    // search data load

    data.forEach((ele) => {
      let { name, imdb, date, sposter, genre, url } = ele;
      let card = document.createElement("a");
      card.classList.add("card");
      card.href = url; //since card element is an anchor element
      card.innerHTML = `
        <img src="${sposter}" alt="" />
        <div class="cont">
          <h3>${name}</h3>
          <p>
            ${genre}, ${date} <span>IMDB</span
            ><i class="bi bi-star-fill"></i>${imdb}
          </p>
        </div>
        `;
      search.appendChild(card);
    });

    // Since now, we have created the elements with tagname 'a',, now applying filter on them

    // search filter
    search_input.addEventListener("keyup", () => {
      let filter = search_input.value.toUpperCase(); //jo v value enter karega changes into uppercase
      let a = search.getElementsByTagName("a"); //here the variable a becomes array,, large no. of values
      // so applying for loop on this array a
      for (let index = 0; index < a.length; index++) {
        let b = a[index].getElementsByClassName("cont")[0];
        // console.log(b.textContent);
        let textValue = b.textContent || b.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          a[index].style.display = "flex";

          //these two's will come into use, once the input field is made empty after putting some values.... and then again we want to see the search,, after inputting some values
          search.style.visibility = "visible";
          search.style.opacity = 1;
        } else {
          a[index].style.display = "none";
        }

        // agar search_input me value kuch v na ho, then make the search hidden
        if (search_input.value == 0) {
          search.style.visibility = "hidden";
          search.style.opacity = 0;
        }
      }
    });

    // making background trailer pause and play
    let video = document.getElementsByTagName("video")[0];
    let play = document.getElementById("play");
    play.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        play.innerHTML = `Play<i class="bi bi-pause-fill"></i>`;
      } else {
        video.pause();
        play.innerHTML = `Watch<i class="bi bi-play-fill"></i>`;
      }
    });

    // popular me kewal popular series dikhana on clicking SERIES in nav
    let series = document.getElementById("series");
    series.addEventListener("click", () => {
      // niche jo cards hai unko khali kiya
      cards.innerHTML = "";
      // fir cards ki content ko series ke liye wapas v layenge
      // ek filter lagayenge

      let series_array = data.filter((ele) => {
        return ele.type === "series"; //type is in the json which is get using data in .fetch..then
      });
      // inserting cards of series
      series_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = url; //since card element is an anchor element
        card.innerHTML = `
            <img src="${sposter}" class="poster" alt="${name}" />
                <div class="rest_card">
                  <img src="${bposter}" alt="" />
                  <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                      <p>${genre},${date}</p>
                      <h3>
                        <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}
                      </h3>
                    </div>
                  </div>
                </div>
            `;
        cards.appendChild(card);
      });
    });

    // for MOVIES
    let movies = document.getElementById("movies");
    movies.addEventListener("click", () => {
      cards.innerHTML = "";
      let movies_array = data.filter((ele) => {
        return ele.type === "movie";
      });
      // inserting cards of movies
      movies_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = url; //since card element is an anchor element
        card.innerHTML = `
            <img src="${sposter}" class="poster" alt="${name}" />
                <div class="rest_card">
                  <img src="${bposter}" alt="" />
                  <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                      <p>${genre},${date}</p>
                      <h3>
                        <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}
                      </h3>
                    </div>
                  </div>
                </div>
            `;
        cards.appendChild(card);
      });
    });

    // for kids
    let kids = document.getElementById("kids");
    kids.addEventListener("click", () => {
      // cards ko khali karenge
      cards.innerHTML = "";
      let kids_array = data.filter((ele) => {
        return ele.type === "kids";
      });
      // inserting cards kids section
      kids_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement("a");
        card.classList.add("card");
        card.href = url; //since card element is an anchor element
        card.innerHTML = `
            <img src="${sposter}" class="poster" alt="${name}" />
                <div class="rest_card">
                  <img src="${bposter}" alt="" />
                  <div class="cont">
                    <h4>${name}</h4>
                    <div class="sub">
                      <p>${genre},${date}</p>
                      <h3>
                        <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}
                      </h3>
                    </div>
                  </div>
                </div>
            `;
        cards.appendChild(card);
      });
    });

    // for Home
    // let home=document.getElementById('home');
    // home.addEventListener('click',()=>{
    //   data.forEach((ele,i) => {
    //     let {name,imdb,date,sposter,bposter,genre,url}=ele;
    //     let card=document.createElement('a');
    //     card.classList.add('card');
    //     card.href='#';  //since card element is an anchor element
    //     card.innerHTML=`
    //     <img src="${sposter}" class="poster" alt="${name}" />
    //         <div class="rest_card">
    //           <img src="${bposter}" alt="" />
    //           <div class="cont">
    //             <h4>${name}</h4>
    //             <div class="sub">
    //               <p>${genre},${date}</p>
    //               <h3>
    //                 <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}
    //               </h3>
    //             </div>
    //           </div>
    //         </div>
    //     `
    //     cards.appendChild(card);
    // });
    // })
  });
