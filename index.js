document.addEventListener("DOMContentLoaded",()=>{
    let listaCompleta = []
    const botonBusqueda = document.getElementById("searchButton")
    const inputBusqueda = document.getElementById("searchInput")
    const endpointURL = "https://my-json-server.typicode.com/felipechak/entregaModoDarkSub4/contacts"
    
    console.log(window.localStorage.getItem("viewMode"))

//Plantilla para la vtarjeta ncon la informacion de la persona
    const crearTarjetaDePersona = (nombre, direccion, telefono, pais) => {
        let content = `<div class="card">
            
            <div class="card-content">
                <h2>${nombre}</h2>
                <p>${direccion} ${pais}</p>
                <a>${telefono}</a>
            </div>`
        return content
    };
    
    //<img src= "${imagen}" alt="Card Image"></img>

    async function fetchData(url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          //console.log(data)
          return data;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      };
     


//DarkMode function
function darkMode() {
    let bodyclass = document.body;
    let toggleIcon = getElementById("toggleButtonIcon")
    let searchBar = document.getElementsByClassName("input-group")[0]
    let cards = document.getElementsByClassName("card")
    console.log(cards)
    bodyclass.classList.toggle("darkmode");
    searchBar.classList.toggle("darkmode");
    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      element.classList.toggle("darkmode");
    }
    toggleIcon.classList.toggle("fa-moon")
    toggleIcon.classList.toggle("fa-sun")
}
//Darkmode Togglebutton
document.getElementById("toggleButton").addEventListener("click", () => {
  darkMode()
})

botonBusqueda.addEventListener("click",()=>{
    let terminoBusqueda = inputBusqueda.value
    let listaFiltrada = listaCompleta.filter((contacto)=>{
        return contacto.name.includes(terminoBusqueda) //sigo pensando que aca no recorre bien la lista porque la data es un array y dentro del array están los objetos. Entonces necetiraría el [] ej: contacto[i].name.includes
    })
    console.log(listaFiltrada)
    imprimirContactos(listaFiltrada)
})

//Searchbar intento de Javi
 inputBusqueda.addEventListener('keyup', e => {
  let currentValue = e.target.value.toLowerCase();
  let personas = document.querySelectorAll('h2.name')
  personas.forEach(persona => {
    if (persona.textContext.toLowerCase().includes(currentValue)) {
    persona.parentNode.parentNode.style.display = 'block';
  } else {
    persona.parentNode.parentNode.style.display = 'none';
  })
}) 
//Print contacts in page
const imprimirContactos = (lista) => {
    document.getElementById("contenedor").innerHTML = ""
    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];
            let nombre = element.name;
            let direccion = element.address;
            let telefono = element.phone;
            let pais = element.country;
           
            let nuevaTarjeta = crearTarjetaDePersona(nombre, direccion, telefono, pais); 
            document.getElementById("contenedor").innerHTML += nuevaTarjeta;
    }
}
//FUNCIONAAA LA SEARCHHHHHH  :DD
// Calling the async function      
    fetchData(endpointURL)
     .then(data => {
        console.log(data)
        listaCompleta = data    
        imprimirContactos(listaCompleta)
    console.log('Fetched data:', data);
    })
    .catch(error => {
    console.error('Error in fetchData:', error);
    });

});
