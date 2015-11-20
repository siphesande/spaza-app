Street Address will a struct.


how might you store multiple pieces of data in one type, where the individual pieces are of different data types?

struct StreetAdress 
{     

     int roomNumber;
     string streetName;
     string suburb;
     string town; 
     string country; 
     int postCode; 
}; 

StreetAdress myAdress = { 7,"Montaine","Summer Greens" "South Africa","Cape Town", 7441 }; 

therefore my  when I change my Adress I will have

StreetAdress newAdress; 

newAdress.roomNumber = 2; 
newAdress.streetName = "Lavinia Str"; 
newAdress.surburbs = "North End";
newAdress.town = "Port Elizaberth"; 
newAdress.country = "South Africa"; 
newAdress.postCode = 8001; 
cout << "My Street Adress is" + newAdress.roomNumber + newAdress.StreetName + newAdress.Surburbs + newAdress.town + newAdress.country + newAdress.postCode << endl;




Birth Date will be struct 

struct BirthDate 
{     

     int date;
     string months;
     int year;
     
}; 

BirthDate myDate = { 13,"April",1991 }; 