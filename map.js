// let map;
// let markers =[];

// const input = document.getElementById("place_input");

// startcoords = {lat: 31.000000,lng: -100.000000}

// const setListener = () => {
//     document.querySelectorAll(".business_individualNames").forEach((businessName, index) =>{
//         businessName.addEventListener("click", () =>{
//             google.maps.event.trigger(markers[index], "click")
//         })
//     })
// }

// const displayBusinessList = () => {
//     let businessHTML = "";
//     business.forEach(business =>{
//         businessHTML += `<h4 class = "business_individualNames">${business.name} <br><br> Address: ${business.address} <br><br> Price: ${business.price}</h4>`
        
//     })
//     document.getElementById("business_names").innerHTML = businessHTML;
// }

// const CreateMarker = (coord, name) => {
//     let html = `<h3>${name}</h3>`
//     const marker = new google.maps.Marker({
//         position: coord,
//         map: map,
//     })
//     google.maps.event.addListener(marker, "click", ()=> {
//         infoWindow.setContent(html);
//         infoWindow.open(map,marker)
//     })
//     markers.push(marker)
// }

// const CreateLocationMarkers = () => {
//     let bounds = new google.maps.LatLngBounds();
//     business.forEach(business => {
//         let coord = new google.maps.LatLng(business.lat, business.lng);
//         let name = business.name;
//         bounds.extend(coord)
//         CreateMarker(coord, name);
        
//     })
// }

// function initMap(){
//     map = new google.maps.Map(document.getElementById("map"),{
//         center:startcoords,
//         zoom: 6
//     })
//     CreateLocationMarkers();
    
//     infoWindow = new google.maps.InfoWindow();
//     displayBusinessList();
//     setListener();
//     initAutocomplete();
// }

// function initAutocomplete(){
//     autocomplete = new google.maps.places.Autocomplete(input)
//     autocomplete.addListener('place_changed', function(){
//         const place = autocomplete.getPlace();
//         map.setCenter(place.geometry.location);
//         marker.setPosition(place.geometry.location);
//     });
// }
let map;
let markers = [];
let infoPopup;
const input = document.getElementById("place_input");

// Sample data - replace this with your actual business data
const business = [
    {
    name: "<a href=https://www.cherishedpetcremations.com/> Cherished Pet Cremations </a>",
    address: "Houston, TX",
    price: "$160+",
    lat: 29.7604,
    lng: -95.3698
    // https://www.cherishedpetcremations.com/
  },
  {
    name: "<a href=https://www.spacecitypetcremations.com/> Space City Pet Cremations </a>",
    address: "Houston, TX 77086",
    price: "Contact for pricing",
    lat: 29.9200,
    lng: -95.4700
    // https://www.spacecitypetcremations.com/
  },
  {
    name: "<a href=https://angeloakspet.com/> Angel Oaks Pet Cremation </a>",
    address: "21755 Building 11 Interstate 45 N, Houston, TX 77388",
    price: "Contact for pricing",
    lat: 30.0799,
    lng: -95.4320
    // https://angeloakspet.com/
  },
  {
    name: "<a href=https://www.fourpawspetcremation.com/> Four Paws Pet Cremation </a>",
    address: "Houston, TX",
    price: "Contact for pricing",
    lat: 29.7604,
    lng: -95.3698
    // https://www.fourpawspetcremation.com/
  },
  {
    name: "<a href=https://texaspetmeadow.com/> Texas Pet Meadow </a>",
    address: "14355 FM 529 Road, Houston, TX 77095",
    price: "Contact for pricing",
    lat: 29.8821,
    lng: -95.6485
    // https://texaspetmeadow.com/
  },
  {
    name: "<a href=https://heavenlypaws.com/> Heavenly Paws </a>",
    address: "Houston, TX",
    price: "Contact for pricing",
    lat: 29.7604,
    lng: -95.3698
    // https://heavenlypaws.com/
  }
];

const startcoords = [31.000000, -100.000000];

const setListener = () => {
    document.querySelectorAll(".business_individualNames").forEach((businessName, index) => {
        businessName.addEventListener("click", () => {
            map.setView(markers[index].getLatLng(), 13);
            markers[index].openPopup();
        });
    });
};

const displayBusinessList = () => {
    let businessHTML = "";
    business.forEach(business => {
        businessHTML += `<h4 class="business_individualNames">${business.name} <br><br> Address: ${business.address} <br><br> Price: ${business.price}</h4>`;
    });
    document.getElementById("business_names").innerHTML = businessHTML;
};

const createMarker = (coord, name, address, price) => {
    const popupContent = `<h3>${name}</h3><p>Address: ${address}</p><p>Price: ${price}</p>`;
    const marker = L.marker(coord)
        .addTo(map)
        .bindPopup(popupContent);
    markers.push(marker);
};

const createLocationMarkers = () => {
    const bounds = L.latLngBounds();
    business.forEach(b => {
        const coord = [b.lat, b.lng];
        createMarker(coord, b.name, b.address, b.price);
        bounds.extend(coord);
    });
    map.fitBounds(bounds);
};

function initMap() {
    map = L.map('map').setView(startcoords, 10); // You can adjust zoom level (e.g., 10–13 for closer)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    createLocationMarkers();       // Just places markers; no bounds fitting
    displayBusinessList();
    setListener();
    initAutocomplete();
}

function initAutocomplete() {
    input.addEventListener("change", () => {
        const placeName = input.value;
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    map.setView([lat, lon], 10);
                }
            });
    });
}

// Initialize Leaflet map after page load
window.addEventListener("DOMContentLoaded", initMap);
