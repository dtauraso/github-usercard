/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


function makeCard(cardObject) {

  let imageUrl = cardObject.avatar_url
  let name = cardObject.name
  let userName = cardObject.login
  // might be null
  let location = cardObject.location

  let profileUrl = cardObject.html_url

  // could be null?  maybe 0
  let followersCount = cardObject.followers
  let followingCount = cardObject.following

  // could be null
  let bio = cardObject.bio

  // define the tags
  let card = document.createElement("div")
  let image = document.createElement("img")
  let cardInfo = document.createElement("div")
  let header3 = document.createElement("h3")
  let usernameParagraph = document.createElement("p")
  let locationParagraph = document.createElement("p")
  let profileParagraph = document.createElement("p");
  // needed here so it doesn't overwrite the nested "a" tag
  profileParagraph.textContent = "Profile:  ";

  let gitProfileLink = document.createElement("a");
  gitProfileLink.href = profileUrl;

  gitProfileLink.textContent = profileUrl;
  profileParagraph.appendChild(gitProfileLink);



  let followersCountParagraph = document.createElement("p")
  let followingCountParagraph = document.createElement("p")
  let bioParagraph = document.createElement("p")

  // make the structure


  // don't useappend for debugging
  card.append(image, cardInfo)
  cardInfo.append(header3,
                  usernameParagraph,
                  locationParagraph,
                  profileParagraph,
                  followersCountParagraph,
                  followingCountParagraph,
                  bioParagraph)

  // add the classes
  card.classList.add("card")
  cardInfo.classList.add("card-info")
  header3.classList.add("name")
  usernameParagraph.classList.add("username")

  // fill the data
  image.setAttribute("src", imageUrl)
  header3.textContent = name
  usernameParagraph.textContent = userName
  if(location === null) {
    locationParagraph.textContent = `Location: Knowhere`

  } else {
    locationParagraph.textContent = `Location: ${location}`

  }
  followersCountParagraph.textContent = `Followers: ${String(followersCount)}`
  followingCountParagraph.textContent = `Following: ${String(followingCount)}`

  if(bio === null) {
    bioParagraph.textContent = `Bio: Originated from Mars`

  } else {
    bioParagraph.textContent = `Bio: ${bio}`

  }

  return card
  
}

// axios.get("https://api.github.com/users/dtauraso/followers")
//   .then(response => {
//     response.data.forEach(object => {
//       console.log(object);

//     })
// })

// axios.get("https://api.github.com/users/dtauraso")
//   .then(response => {
//     console.log(response.data);

//   })

let cardsSelector = document.querySelector(".cards")

axios.get("https://api.github.com/users/dtauraso")
    .then(response => {
      let myCard = makeCard(response.data)
      console.log(myCard)
      cardsSelector.appendChild(myCard)
      console.log(response.data);
      
      // collect my followers
      // stretch goal by getting the followers directly from the github api right after my card has been presented

      getFollowers("dtauraso");

      // run a forEach get.then for each follower
      // return response
    })
    .catch(error => {

      console.log(error.message)
    })

function getFollowers(userName) {
    axios.get(`https://api.github.com/users/${userName}/followers`)
    .then(response => {
      
      response.data.forEach(object => {
        // console.log(object.login);
        axios.get(`https://api.github.com/users/${object.login}`)
        .then(response => {
          // console.log(response.data)
          let myCard = makeCard(response.data)
          cardsSelector.appendChild(myCard)
            })
        .catch(error => {

          console.log(error.message)
        })

      })
    })
    .catch(error => {

    console.log(error.message)
    })
}