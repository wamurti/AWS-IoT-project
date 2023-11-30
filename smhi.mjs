import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  // TODO implement
  
  console.log("Starting function");
  
  const r = await fetch("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/97200/period/latest-hour/data.json");
  const temp = await r.json()
  const tableName = "Esp8266";
  let body;
  var date = temp.value[0].date;
  date = (date-(date%1000))/1000; //Skalar bort 3 sista siffrorna för att få samma format som epochtiden i sensorn.
  var t = temp.value[0].value;
  
  console.log("Date: ", date)
  console.log("Temp: ", t)
  await dynamo.send(
  new PutCommand({
    TableName: tableName,
    Item: {
      device_id: "SMHI",
      temperature:parseInt(t, 4),
      EpochTime: date,
      airQuality:temp.value[0].quality,
      
    },
    
  })
  );
  body = `Put item ${temp.value}`;
  
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({"smhi": temp.value}),
  };
  return response;
};