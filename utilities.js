// store data
let storePetsData = []



const loadingSpinner=(show) =>{
    const spinner = document.getElementById('loader')
    if(show){
        spinner.classList.remove('hidden')
        document.getElementById('all-pets').innerHTML=''
    }
    else{
        spinner.classList.add('hidden')
    }
}

// remove active 

const removeActiveClass = ()=>{
 const allButton = document.querySelectorAll('.category-btn')
for(btn of allButton){
    btn.classList.remove(
        'bg-emerald-100',
    'rounded-full',
    'border-teal-800',
    'border-2'
    )
    btn.classList.add('rounded-xl')
}
 
}

// add active

const addActiveClass = category =>{
const activeButton = document.getElementById(`btn-${category}`)
activeButton.classList.remove('rounded-xl')
activeButton.classList.add('bg-emerald-100',
    'rounded-full',
    'border-teal-800',
    'border-2'
)
}

// like 

const like= imgUrl =>{
  const imgContainer = document.getElementById('like-pet')
const div = document.createElement('div')
div.innerHTML = ` <img class=" rounded-lg" src="${imgUrl}" />`
imgContainer.appendChild(div)
    
}

//  sort data

const sort = () =>{
    loadingSpinner(true)
    const sortedData = storePetsData.sort((a,b) => b.price - a.price)

    setTimeout(()=>{
        loadingSpinner(false)
        displayPets(sortedData)
    },500)
   
}