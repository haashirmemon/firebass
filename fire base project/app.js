




import {
  onAuthStateChanged,
  auth,
  signOut,
  getDocs,
  collection,
  db,
  deleteDoc,
  storage,
} from "./utils/utils.js";
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
    login_btn.style.display = "none";
    user_info.style.display = "block";
    user_info.innerText = user.email;
    create_recipe_btn.style.display = "block";
    logout_btn.style.display = "block";
  } else {
    login_btn.style.display = "block";
    user_info.style.display = "none";
    user_info.innerText = "";
    create_recipe_btn.style.display = "none";
    logout_btn.style.display = "none";
  }
});

logout_btn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
});

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
    <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900">
 
  <div class="flex flex-col justify-between p-4 leading-normal">
   <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-98 md:rounded-none md:rounded-s-lg" src="${image}" alt="">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-white-900 dark:text-white">${foodName}</h5>
      <p class="mb-3 font-normal text-gray-200 dark:text-white-900"> FOOD LOCATION :${foodLocation}.</p>
      <p class="mb-3 font-normal text-gray-200 dark:text-white-900">Added By email :${addByEmail}</p>
      <p class="mb-3 font-normal text-gray-200 dark:text-white-900">Added By price: ${foodPrice}</p>
    

        
      <button     id="like-${food.id}" class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">likeme</button>
      "

        <br>
             <button     id="dislike-${food.id}" class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">dislike</button> 
        <br>
        
        <button     id="delete-${id}"  class="relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-lime-500
        before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-lime-500 before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">delete</button>
  
  </div>
       
      "
</a>
      `;

    cards_container.innerHTML+= card;
    const deleteButton = document.getElementById(`delete-${id}`);
    deleteButton.addEventListener('click', async function () {
      try {
        await deleteDoc(doc(db, 'foods', id));
        console.log('Document successfully deleted!');
       
        document.getElementById(`food-${id}`).parentNode.remove();
      } catch (error) {
        console.error('Error removing document: ', error);
      }

    const likeButton = document.getElementById(`like-${food.id}`);
    const dislikeButton = document.getElementById(`dislike-${food.id}`);
    // const deleteButton = document.getElementById(`delete-${food.id}`);

    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      likeButton.style.backgroundColor = "blue";
      likeButton.style.color = "red";
      dislikeButton.style.backgroundColor = 'blue';
      dislikeButton.style.color = 'red';
    });

    dislikeButton.addEventListener('click', function () {
      likeButton.style.backgroundColor = "red";
      likeButton.style.color = "blue";
      dislikeButton.style.backgroundColor = 'red';
      dislikeButton.style.color = 'blue';
    });

    
    
  });
})}
// Example usage
// getFoods().then(displayFoods);



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
