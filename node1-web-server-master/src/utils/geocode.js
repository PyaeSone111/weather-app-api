const request=require('request')

const geocode=(address, callback)=>{
  
  	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiemF3bXlpbnRvbyIsImEiOiJja2FldjlxY2YwOGtvMnhtdnd6ajhpODYzIn0.qjk7EuycoRgLaOkXx_5Qkg&limit=1'
  	request({url, json:true}, (error, {body}={})=>{
  		if(error){
  			callback('Unbale to connect ')
  		}else if(body.features.length===0){
  			callback('Unbale to find the address. Try another one')

  		}else{
  			callback(undefined,{
  				'longtitude':body.features[0].center[0],
  				'latitude':body.features[0].center[1],
				'place':body.features[0].place_name,
				'place_id':body.features[0].id,
				'place_type':body.features[0].place_type[0]
  			})
  		}
  	})
}

module.exports= geocode