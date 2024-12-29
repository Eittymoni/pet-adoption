const loadCategories = async () =>{
    const response= await fetch(
      'https://openapi.programming-hero.com/api/peddy/categories'  
    )
    const data = await response.json()
    displayCategories(data.
        categories
);
    
}

const loadAllPets = async () =>{
    loadingSpinner(true)
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()

    setTimeout(()=>{
        displayPets(data.pets)
        storePetsData =data.pets
        loadingSpinner(false)
    },2000)
   
    
}

const loadPetByCategory = async category =>{

    // remove 
    removeActiveClass()
    // show
    addActiveClass(category)

    loadingSpinner(true)
const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)

const data = await res.json()

setTimeout(()=>{
    displayPets(data.data);
    storePetsData = data.data
    loadingSpinner(false)
},2000)



}
const loadPetDetails = async id =>{

const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)

const data = await res.json()

displayPetDetails(data.petData);


}
const displayPetDetails =  data=>{
    const modalBody = document.getElementById('details-container')
    modalBody.innerHTML =`
    <img class=" h-60 rounded-xl object-cover min-w-full" src="${data.image}" />
    <h3 class ="text-xl font-bold my-2 "> ${data.pet_name} </h3>
    <div class =" flex items-start gap-6">
     <div> 
     <p class=" text-gray-600 text-sm"><i class="fa-solid fa-paw"></i> Breed: ${data.breed? data.breed: "Not Available"} </p>
     <p class=" text-gray-600 text-sm"><i class="fa-solid fa-venus-mars"></i> Gender: ${data.gender? data.gender: "Not Available"} </p>
     <p class=" text-gray-600 text-sm"><i class="fa-solid fa-syringe"></i> Vaccinated Status: ${data.vaccinated_status? data.vaccinated_status: "Not Available"} </p>
     </div>
      <div>
        <p class=" text-gray-600 text-sm"><i class="fa-solid fa-calendar-days"></i> Birth Date: ${data.date_of_birth? data.date_of_birth: "Not Available"} </p>
          <p class=" text-gray-600 text-sm"><i class="fa-solid fa-dollar-sign"></i> Price: ${data.price?"$"+ data.price: "Not Available"} </p>
      </div>
    
    </div>
    <hr class=" my-2"/>
    <h3 class =" font-semibold text-md">Details Information:</h3>
    <p class=" text-sm text-gray-600"> ${data.pet_details?data.pet_details:"Not Available"} </p>

    `
    my_modal_5.showModal()
}


const displayCategories = data =>{
    const categoryContainer = document.getElementById(' pet-categories')
    data.forEach(category =>{
        const div = document.createElement('div')
        div.innerHTML =` 
        <button id="btn-${category.category}" onClick="loadPetByCategory('${category.category}')" class='btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full'> 
        <img src=${category.category_icon} alt=" " class=' w-10' />
        <p class='text-xl font-bold '>${category.category} </p>
        </button>`
        categoryContainer.appendChild(div)
    })
    
}

const displayPets = data =>{
    const petContainers = document.getElementById('all-pets')
if(data.length === 0){
    petContainers.classList.remove('grid')
    petContainers.innerHTML =`
    <div class=" bg-gray-100 p-20  rounded-xl text-center space-y-4">
    <img class=" mx-auto" src="./assets/error.webp" />
    <h3 class ="text-3xl font-semibold"> No Data Available </h3>
    <p class="text-base text-[#BFA5A5] py-6 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a. </p>
    </div>
    `
    return
}
else{
    petContainers.classList.add('grid')
}
    
    data.forEach(pet=>{
       const div = document.createElement('div')
       div.classList.add ('flex', 'flex-col', 'm-3','gap-2', 'p-4', 'border' ,'rounded','font-bold' )
        
       div.innerHTML = `
       <img src= "${pet.image}" class=" h-33 w-full rounded-xl object-cover" />
       <h3 class=" text-xl"> ${pet.pet_name}
       <p class=" text-sm text-[#BFA5A5]"> Breed: ${pet.breed? pet.breed:"Not Available"} </p>
       <p class=" text-sm text-[#BFA5A5]"> Birth: ${pet.date_of_birth? pet.date_of_birth:"Not Available"} </p>
       <p class=" text-sm text-[#BFA5A5]"> Gender: ${pet.gender ? pet.gender:"Not Available"} </p>
       <p class=" text-sm text-[#BFA5A5]"> Price:${pet.price? '$'+ pet.price:"Not Available"} </p>
 <hr class ='my-2'/>
<div class=" flex justify-between items-center px-2">
<button onclick="like('${pet.image}')" class=" btn bg-white text-teal-700 rounded-lg py-1 px-4" > <i class="fa-regular fa-thumbs-up"></i></button>
<button onclick="adoptModal(this)" class=" btn bg-white text-teal-700 rounded-lg py-1 px-4" >Adopt </button>
<button onclick="loadPetDetails('${pet.petId}')" class=" btn bg-white text-teal-700 rounded-lg py-1 px-4" >Details </button>
</div>
       `
       petContainers.appendChild(div)
    })
}

const adoptModal = event =>{
    let count =3
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText =count
    my_modal_4.showModal()
    const interval = setInterval(()=>{
count--
if( count !==0 )countContainer.innerText =count
if(count<1){
    clearInterval(interval)
    my_modal_4.close()
  event.textContent = 'Adopted'
  event.disabled = true
}
    },1000)
}


loadCategories()
loadAllPets()