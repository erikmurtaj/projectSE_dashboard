AWS.config.update({
    region: "eu-north-1",
    endpoint: "https://dynamodb.eu-north-1.amazonaws.com",
    // accessKeyId default can be used while using the downloadable version of DynamoDB.
    accessKeyId: "AKIA43VWX2S7CEX3WRFW",
    // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    secretAccessKey: "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"
  });
AWS.config.update({ region: 'eu-north-1' });
var docClient = new AWS.DynamoDB.DocumentClient();


function set_vehicles_sidebar(){

  const scanAll = async (params, li_id_x) => {

    var itemsAll = [];
    var data = await docClient.scan(params).promise();
    for (const item of data.Items) {

      // Sidebar population with vehicles names divided by fleets
      li_id = document.getElementById(""+li_id_x);

      new_a = document.createElement("a");
      new_a.setAttribute("class", "nav-link");
      new_a.setAttribute("href", "#");
      new_a.setAttribute("onclick", `vehicle_id_clicked(\`${item.ID}\`);return false;`);

      new_i = document.createElement("i");
      new_i.setAttribute("class", "nav-icon fas fa-snowplow");

      new_p = document.createElement("p");

      new_p.innerHTML = ""+ item.name;

      new_a.appendChild(new_i);
      new_a.appendChild(new_p);
      li_id.appendChild(new_a);

      // General table population with all vehicles
      tbody = document.getElementById("tbody_vehicles_table");
      // new table line
      new_tr = document.createElement("tr");
      // name column
      new_td = document.createElement("td");
      new_td.innerHTML = ""+ item.name;
      // fleet column
      new_td2 = document.createElement("td");
      let res = item.ID.split("/");
      new_td2.innerHTML = ""+ res[0];
      // engine temperature column
      new_td3 = document.createElement("td");
      new_td3.innerHTML = ""+ item.temperature+"°";
      // fuel column
      new_td4 = document.createElement("td");
      new_span = document.createElement("span");
      new_span.setAttribute("class", "badge bg-danger");
      new_span.innerHTML = ""+ item.fuel+"%";
      new_td4.appendChild(new_span);
      // working hours column
      new_td5 = document.createElement("td");
      new_td5.innerHTML = ""+ item.workingHours;


      new_tr.appendChild(new_td);
      new_tr.appendChild(new_td2);
      new_tr.appendChild(new_td3);
      new_tr.appendChild(new_td4);
      new_tr.appendChild(new_td5);
      tbody.appendChild(new_tr);

    }
    return data;
  }

  var params = {
      TableName: "Volvo1"
  };

  var params2 = {
      TableName: "Scania1"
  };

  var itemsAllz = scanAll(params, "vehicles-li");
  var itemsAllz = scanAll(params2, "vehicles-li-2");
}

  async function readItem_3(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var temperature_value;
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.temperature;
      } catch(err) {
         console.log(err);
      }
  }

  async function readLongitude(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var temperature_value;
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.longitude;
      } catch(err) {
         console.log(err);
      }
  }

  async function readLatitude(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.latitude;
      } catch(err) {
         console.log(err);
      }
  }

  async function readStatus(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.vehicleStatus;
      } catch(err) {
         console.log(err);
      }
  }

  async function readWorkinghrs(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.workingHours;
      } catch(err) {
         console.log(err);
      }
  }

  async function readTirePressures(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.tirePressure;
      } catch(err) {
         console.log(err);
      }
  }

  async function readFuel(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.fuel;
      } catch(err) {
         console.log(err);
      }
  }

  async function readTilt(vehicle_id) {
      var res = vehicle_id.split("/");
      var table = res[0]+"1";
      var params = {
          TableName: table,
          Key:{
              "ID": vehicle_id
          }
      };

      try {
         let res = await docClient.get(params).promise();
         return res.Item.tilt;
      } catch(err) {
         console.log(err);
      }
  }

  async function vehicle_id_clicked(vehicle_id){
    document.getElementById('chart_off_button').click();
    document.getElementById('table_div').style.display = "none";
    //console.log(vehicle_id);
    let promise_result=readItem_3(vehicle_id);
    let temperature_value;
    let longitude;
    let latitude;
    await promise_result.then(function(result) {
        temperature_value=result;
    });

    promise_result=readLongitude(vehicle_id);
    await promise_result.then(function(result) {
        longitude=result;
    });

    promise_result=readLatitude(vehicle_id);
    await promise_result.then(function(result) {
        latitude=result;
    });

    let status="";
    promise_result=readStatus(vehicle_id);
    await promise_result.then(function(result) {
        status=result;
    });

    let workingHours="";
    promise_result=readWorkinghrs(vehicle_id);
    await promise_result.then(function(result) {
        workingHours=result;
    });

    let tirePressures="";
    promise_result=readTirePressures(vehicle_id);
    await promise_result.then(function(result) {
        tirePressures=""+result;
    });

    let fuel="";
    promise_result=readFuel(vehicle_id);
    await promise_result.then(function(result) {
        fuel=""+result;
    });

    let tilt="";
    promise_result=readTilt(vehicle_id);
    await promise_result.then(function(result) {
        tilt=""+result;
    });

    promise_result=readItem(vehicle_id, "temperature");
    console.log(promise_result);

    document.getElementById("engine_temperature_value").innerHTML=""+temperature_value+"°";
    document.getElementById("status_value").innerHTML=""+status;
    document.getElementById("workinghrs_value").innerHTML=""+workingHours;
    let tires = tirePressures.split(",");
    document.getElementById("tirePressures_value").innerHTML="FL: "+tires[0]+" FR: "+tires[1]+" BL: "+tires[2]+" BR: "+tires[3];
    document.getElementById("fuel_value").innerHTML=""+fuel+"%";
    document.getElementById("tilt_value").innerHTML=""+tilt+"°";
    //document.getElementById('interactive').remove();
    initialize_chart(vehicle_id);
    //destroy_chart();
    //console.log("this is the temperature:"+ readItem(vehicle_id));
    document.getElementById('engine_temperature_div').style.display = "block";
    document.getElementById('status_div').style.display = "block";
    document.getElementById('workinghrs_div').style.display = "block";
    document.getElementById('tirePressures_div').style.display = "block";
    document.getElementById('fuel_div').style.display = "block";
    document.getElementById('tilt_div').style.display = "block";
    document.getElementById('interactive-chart').style.display = "block";
    generateMap(longitude, latitude);
    document.getElementById('map').style.display = "block";
  }
