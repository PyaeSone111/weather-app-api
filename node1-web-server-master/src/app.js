const express= require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000

const dirPath=path.join(__dirname,'../public')
app.use(express.static(dirPath))

const costmView=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', costmView)
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
	res.render('index',{
		title:"Your Loaction",
		name:'Zaw'
	})
})
app.get('/about',(req,res)=>{
	res.render('about',{
		title:"About",
		name:'Zaw'
	})
})
app.get('/help',(req,res)=>{
	res.render('help',{
		title:"Help",
		name:'Zaw'
	})
})

app.get('/weather',(req,res)=>{
	const address=req.query.search

	if(!req.query.search){
		return res.send({
			err:'Plz provide the address'
		})
	}
	geocode(address,(err, {longtitude,latitude,place,place_id,place_type}={})=>{
		
		if(err){
			return res.send({err})
		}else{
			res.send({
				longtitude,
				latitude,
				place,
				place_id,
				place_type
			})
		}
		 
	})
	// res.send({
	// 	address
	// })

})

app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'Zaw',
		errMessage:'help article not found'
	})

})

app.get('*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'Zaw',
		errMessage:'Page not Fuound'
	})

})



app.listen(port,()=>{
	console.log("Server is listening prot " +port)
})