const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');

const path = require('path');

const port = process.env.PORT || 3000;


const publicPath = path.join(__dirname, "/dist/angular_a8");

app.use(express.static(publicPath));


YELP_API_KEY = 'ZhtS5OKfEr5Bxij0OuQv9gIRK6AlX81y5pFAEKqI1tH053SzO8AdYQN-Mil_ofrz4CEX1AsXG2TsSjh4ghVn_elDNw6cpLOpFO7ibVddKRQijGDXBvCPGqybTzA6Y3Yx'
YELP_API_HOST = 'https://api.yelp.com'
YELP_SEARCH_PATH = '/v3/businesses/search'
YELP_BUSINESS_PATH = '/v3/businesses/'



HEADERS = {'Authorization': 'Bearer %s' % YELP_API_KEY}


geoCodeAPI = 'AIzaSyCAHrI0rBjfsrO-7socdMKUGkZlkI_XhWc'

geo_location_token = '6814f7ebb4748f'




// app.get('/getDatarama',(req,res)=>{
    
    
//     let car = res.json({
//         "statusCode": 200,
//         "statusMessage": "This is successful"
//     })

//     return car;
    
// });




// app.get('/testDATA',(req,res) =>{
//     axios.get('https://ipinfo.io/?token=6814f7ebb4748f')
//     .then((response) => {
//         response.send(response.data);
//     })
// })

 



 async function retrieveAutoC()
{
    //let data;
    let newData;

    await 
    axios
    .get("https://ipinfo.io/?token=6814f7ebb4748f")
    .then((response) => {
        fs.writeFileSync('autoCoordinate.json',JSON.stringify(response.data));
    })
    .catch((err) => console.log(err));  


    let rawData = fs.readFileSync('autoCoordinate.json');
    let parseData = JSON.parse(rawData);
        
    //console.log("Data from the function retrieveAutoC",parseData);
    //return data;
    return parseData.loc;
}

async function retrieveGoogleC(uniqueLocation)
{
   // console.log("UNIQUE LOCATION",uniqueLocation);
    await 
    axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?address="+uniqueLocation+'&key='+geoCodeAPI)
    .then((response) => {
        console.log(response)
        fs.writeFileSync('googleLoc.json',JSON.stringify(response.data));
    })
    .catch((err) => console.log(err));  


    let rawData = fs.readFileSync('googleLoc.json');
    let parseData = JSON.parse(rawData);
        

   // console.log("Data from the function retrieveGoogleC",parseData.results[0].geometry.location);
    let array = [];
    array[0] = parseData.results[0].geometry.location.lat;
    array[1] = parseData.results[0].geometry.location.lng;
    //console.log("arrayyyy",array);
    return array;
}
function convertData(radius)
{
    radius = radius * 1609.34;
    radius = parseInt(radius);
    return radius;
}
app.get('*/getDatarama/:inputData',(async (request, response) => {

    let {inputData} = request.params;
    
    // console.log("WEFWFWEF",inputData);
    // console.log("PARSED DATA FROM SERVER",JSON.parse(inputData));
    let parsedInput = JSON.parse(inputData);
    //console.log("LOCATIONlllll",parsedInput.latitude);
    //console.log("THIS IS THE CONVERTED DATA FZC: ",convertData(5));
    parsedInput.radius = convertData(parsedInput.radius);
    //console.log("Converted Radius",parsedInput.radius);
   

    let latiLong= " ";
    let coordinateArray = [];
    if(parsedInput.latitude == true)
    {
        latiLong = await retrieveAutoC();
        //console.log(latiLong);
        coordinateArray = latiLong.split(",");
       // console.log(coordinateArray);
        coordinateArray[0] = parseFloat(coordinateArray[0]);
        coordinateArray[1] = parseFloat(coordinateArray[1]);
       // console.log(coordinateArray);

    }
    else
    {   
      latiLong = await retrieveAutoC();
      //console.log(latiLong);
      coordinateArray = latiLong.split(",");
     // console.log(coordinateArray);
      coordinateArray[0] = parseFloat(coordinateArray[0]);
      coordinateArray[1] = parseFloat(coordinateArray[1]);
        // let searchVal = parsedInput.latitude
        // let newSearch = searchVal.replace(" ","+")
        
        // coordinateArray = await retrieveGoogleC(newSearch);
    }
    parsedInput.latitude = coordinateArray[0].toFixed(6);
    parsedInput.longitude = coordinateArray[1].toFixed(6);
    //console.log("PARSED INPUT AFTER TRASNFORMATION",parsedInput);

    await axios.get("https://api.yelp.com/v3/businesses/search", {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`
          
     },
        params: {
            term: parsedInput.keyword,
            radius: parsedInput.radius,
            categories:parsedInput.categories,
            latitude:parsedInput.latitude,
            longitude:parsedInput.longitude,
            limit: 10
     }})
     .then((res) => {
        fs.writeFileSync('yelpSearch.json',JSON.stringify(res.data));
      //console.log("from yelpeeee",res.data)
      response.send(res.data);
     })
     .catch((err) => {
      var newDict = res.json({
        message: "FAIL"
      })
      res.send(newDict)
     });
     
     //let businessData = fs.readFileSync('autoCoordinate.json');

     //return JSON.parse(businessData);

  }))
  app.get('*/getSingo/:inputData',(async (request, response) => {

    let {inputData} = request.params;
    
    //console.log("This is at the server for single bus",inputData);

    await axios.get("https://api.yelp.com/v3/businesses/"+inputData, {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`
          
     }})
     .then((res) => {
        fs.writeFileSync('singleBus.json',JSON.stringify(res.data));
      //console.log("this is the single ",res.data)
      response.send(res.data);
     })
     .catch((err) => {
      //console.log (err)
     });
     
     //let businessData = fs.readFileSync('autoCoordinate.json');

     //return JSON.parse(businessData);

  }))

  app.get('*/getReview/:inputData',(async (request, response) => {

    let {inputData} = request.params;
    
    console.log("This is at the server for REVIEW bus",inputData);

    await axios.get("https://api.yelp.com/v3/businesses/"+inputData+"/reviews", {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`
          
     }})
     .then((res) => {
        fs.writeFileSync('reviews.json',JSON.stringify(res.data));
      //console.log("this is the reviews ",res.data)
      response.send(res.data);
     })
     .catch((err) => {
      console.log (err)
     });
     
     //let businessData = fs.readFileSync('autoCoordinate.json');

     //return JSON.parse(businessData);

  }))

  app.get('*/autoCom/:inputData',(async (request, response) => {

    let {inputData} = request.params;
    
    //console.log("This is at the server for REVIEW bus",inputData);


    let latiLong= " ";
    let coordinateArray = [];
    latiLong = await retrieveAutoC();
        //console.log(latiLong);
    coordinateArray = latiLong.split(",");
       // console.log(coordinateArray);
    coordinateArray[0] = parseFloat(coordinateArray[0]);
    coordinateArray[1] = parseFloat(coordinateArray[1]);




    await axios.get("https://api.yelp.com/v3/autocomplete", {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`
          
     }, params: {
            text: inputData,
            latitude:coordinateArray[0],
            longitude:coordinateArray[1]
     }
    })
     .then((res) => {
        fs.writeFileSync('autComplete.json',JSON.stringify(res.data));
      //console.log("this is the autoComplete ",res.data)
      response.send(res.data);
     })
     .catch((err) => {
      console.log (err)
     });
     
     //let businessData = fs.readFileSync('autoCoordinate.json');

     //return JSON.parse(businessData);

  }))


  app.get("*", (req, res) => {
   // console.log("thsidssdcscc",path.join(__dirname + "/dist/angular_a8/index.html"));
    res.sendFile(path.join(__dirname + "/dist/angular_a8/index.html"));
  });




  app.listen(port, () => {
    console.log(`Server is up on ${port}`);
  });

