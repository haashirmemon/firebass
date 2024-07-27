




import {
  onAuthStateChanged,
  auth,
  signOut,
  getDocs,
  collection,
  db,
  deleteDoc,
  storage,
} from "../utils/utils.js";
// console.log(storage);

const cards_container = document.getElementById("cards_container");
const login_btn = document.getElementById('login_btn');
const user_info = document.getElementById('user_info');
const create_recipe_btn = document.getElementById('create_recipe_btn');
const logout_btn = document.getElementById('logout_btn');
const searchInput = document.getElementById("search-input");
const priceSelect = document.getElementById("priceSelect");

onAuthStateChanged(auth, (user) => {
  if (user) {
    logout_btn.style.display = "block";
    create_recipe_btn.style.display = "block";
    login_btn.style.display = "none";
    user_info.style.display = "block";
    user_info.innerText = user.email;
  } else {
    create_recipe_btn.style.display = "none";
    logout_btn.style.display = "none";
    login_btn.style.display = "block";
    user_info.style.display = "none";
    user_info.innerText = "";
  }
});

logout_btn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
});
console.log(logout_btn);

let foodData = [];

async function getFoods() {
  const querySnapshot = await getDocs(collection(db, "foods"));
  querySnapshot.forEach((doc) => {
    const obj = doc.data();
    foodData.push({
      id: doc.id,
      ...obj,
    });
  });

  displayFoods(foodData);
}
function displayFoods(data) {
  cards_container.innerHTML = "";
  data.forEach((food) => {
    const {id, image, foodName, foodPrice, foodLocation, addByEmail } = food;

    const card = `
    <div id="food-${id}" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="height: auto;">
  <a href="#">
      <img class="rounded-t-lg" src="${image}" alt="" />
  </a>
  <div class="p-5">
      <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${foodName}</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${foodLocation}.</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${addByEmail}.</p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">$${foodPrice}.</p>

      
      

      <button     id="delete-${id}"  class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">delete</button>
  
  </div>
</div>
    
      `;
    cards_container.innerHTML+= card; })}
  // Function to set up delete functionality for a specific item
// function setupDeleteButton(id) {
//   const deleteButton = document.getElementById(`food-${id}`);
  
//   if (deleteButton) {
//     deleteButton.addEventListener('click', async function () {
//       try {
//         // Delete the document from Firestore
//         await deleteDoc(doc(db, 'foods', id));
//         console.log('Document successfully deleted!');

//         // Remove the corresponding DOM element (the card)
//         const foodElement = document.getElementById(`food-${id}`);
//         if (foodElement) {
//           foodElement.remove();
//         }
//       } catch (error) {
//         console.error('Error removing document: ', error);
//       }
//     });
//   } else {
//     console.error('Delete button not found for id:', `food-${id}`);
//   }
// }
// setupDeleteButton(`food-${id}`);
// Example usage: setting up delete functionality for a specific ID

 
   // Function to set up delete functionality for a specific item

// Example usage: setting up delete functionality for a specific ID

    
    // const likeButton = document.getElementById(`like-${food.id}`);
    // const dislikeButton = document.getElementById(`dislike-${food.id}`);


    // likeButton.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   likeButton.style.backgroundColor = "blue";
    //   likeButton.style.color = "red";
    //   dislikeButton.style.backgroundColor = 'blue';
    //   dislikeButton.style.color = 'red';
    // });

    // dislikeButton.addEventListener('click', function () {
    //   likeButton.style.backgroundColor = "red";
    //   likeButton.style.color = "blue";
    //   dislikeButton.style.backgroundColor = 'red';
    //   dislikeButton.style.color = 'blue';
    // });

    
    
//   });
// })}
// Example usage
getFoods().then(displayFoods);



searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredFoods = foodData.filter(food => food.foodName.toLowerCase().includes(query));
  displayFoods(filteredFoods);
});

priceSelect.addEventListener("change", (e) => {
  const [min, max] = e.target.value.split("-").map(Number);
  const filteredFoods = foodData.filter(food => food.foodPrice >= min && food.foodPrice <= max);
  displayFoods(filteredFoods);
});
getFoods();

// ${image}
