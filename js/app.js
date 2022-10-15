const loadePhones = (searchText, datalimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data, datalimit))
}
const displayPhones = (phones, datalimit) => {
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent=``;
   //show 20 phone only and show all btn
   const showAll = document.getElementById('show-all')
   if (datalimit && phones.length > 10) {
       phones= phones.slice(0, 10);
       showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }
   
   // no phone massage
   const noPhone = document.getElementById('no-phone-massage');
   if(phones.length ===0){
     noPhone.classList.remove('d-none')
   }
   else{
    noPhone.classList.add('d-none')
   }
   // display all phones
   
   for(const phone of phones){
    console.log(phone);
    const phoneDiv=document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML= `
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadePhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
    </div>
    </div>
    
    `;
    phoneContainer.appendChild(phoneDiv)
   }
   // stop spinner
   toggoleSpinner(false)
}

const processsearch = (datalimit) => {
    toggoleSpinner(true);
    const searchField = document.getElementById('search-phone');
    const searchText =searchField.value;
    loadePhones(searchText, datalimit)
}
// search phone
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processsearch(10)
})
// ssearch by enter key button
document.getElementById('search-phone').addEventListener('keypress', function(e){
    // console.log(e.key);
    if(e.key === 'Enter'){
        processsearch(10)
    }
})
// loadePhones('a')
const toggoleSpinner = isLoading =>{
    const spinnerLoader = document.getElementById('loader')
    if (isLoading === true) {
        spinnerLoader.classList.remove('d-none')
        
    }
    else{
        spinnerLoader.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    processsearch()
});

// loade phone data
const loadePhoneDetails = async(id) => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
// exampleModalLabel
const displayPhoneDetails = phone =>{
    console.log(phone);
   const modalTitle =document.getElementById('exampleModalLabel');
   modalTitle.innerText = phone.name;
   const phoneDetails = document.getElementById('phoned')
   phoneDetails.innerHTML =`
   <p> Relese Date :${phone.releaseDate ? phone.releaseDate : 'No relese Date Found'}  </p>
   <p>Brand : ${phone.brand} </p>
   <p> Chip Set ${phone.mainFeatures.chipSet} </p>
   <p> Display ${phone.mainFeatures.displaySize} </p>
   <p> Memory ${phone.mainFeatures.memory} </p>
   
   `

}