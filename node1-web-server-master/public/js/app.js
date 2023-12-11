const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const latitude=document.querySelector('#latitude')
const longtitude=document.querySelector('#longtitude')
const place=document.querySelector('#place')
const place_id=document.querySelector('#place_id')
const place_type=document.querySelector('#place_type')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    latitude.textContent= "Loading ..."
    longtitude.textContent=''
    place.textContent=''
    place_id.textContent=''
    place_type.textContent=''
    const localtion= search.value
    fetch('/weather/?search='+localtion).then((respone)=>{
    respone.json().then((data)=>{

        if(data.err){
          return latitude.textContent=data.err
        }
       latitude.textContent='Latitude : '+ data.latitude
        longtitude.textContent='Longitude : '+data.longtitude
        place.textContent='Place : '+data.place
        place_id.textContent='Place ID: '+data.place_id
        place_type.textContent='Place Type: '+data.place_type
    })
})
})