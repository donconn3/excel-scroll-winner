//variables
window.onload = () =>{
    setDefaults();
}
// const readSchema = {

// }

const input = document.getElementById('input');
let raffleTitle = document.getElementById('raffle-title');
const sheet1= document.styleSheets[1];
let body = document.getElementById('grad1');
let root = document.documentElement;
let btn = document.getElementById('get-data');
//const colDisplay = document.getElementById("colDisplay");
//const fileBodyRows = document.getElementById("fileBody");
let reset = document.getElementById('reset');
let names = document.getElementById('names');
let congrats = document.getElementById('congrats');
let confetti = document.getElementById('confetti');
let confettiImg = document.getElementById('confettiImg');
let form = document.getElementById('file');
let subject = document.getElementById('title');
let sliderValue = document.getElementById('customRange3')
let duration = document.getElementById('duration');
let excludeWinners = document.getElementById('excludeWinners');

//this array keeps track of all winners - regardless if they are excluded - and saves them to local storage
let winners =[];

//this array keeps track of winners if they need to be excluded from each drawing
const winnerId = [];

//this array keeps track of of players that have already been randomly selected so they do not get picked again
const exclusions = [];

//empty array to put array of rows from excel data
let data = [];

//empty array of random contestants
let players = [];

function validateFile(){
    let ele = input.value.split(".");

    // Allowing file type
if (!input.value.includes('xls') || !input.value.includes('xlsx')) {
    alert('Invalid file type');
    input.value = '';
}else{
    //console.log("foobar")
    const sampleTable = document.querySelector(".table");
    sampleTable.innerHTML = `
<thead >
            <tr id="fileHeader">
              
            </tr>
          </thead>
          <tbody id="fileBody">
            <tr id="fileBody1">
            </tr>
            <tr id="fileBody2">
            </tr>
            <tr id="fileBody3">
            </tr>
            <tr id="fileBody4">
            </tr>
            <tr id="fileBody5">
            </tr>
            </tbody>`;

    const fileHeaderRow = document.getElementById("fileHeader");

    //reads file //grabs first sheet // promise of rows
    readXlsxFile(input.files[0], {includeNullValues: true}).then(function(rows) {
    //location.reload();
        data = rows;
        let sampleData = rows.splice(0, 6);
        sessionStorage.setItem('sheet',JSON.stringify(data));
        
        for(const header of sampleData[0]){
        let tableHead = document.createElement("th");
        tableHead.setAttribute("scope","col");
        tableHead.innerHTML = `
        <h3>${header}</h3>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="displayCheck">
                  <label class="form-check-label" for="flexCheckChecked">
                    Display
                  </label>
                </div>
        `;

        fileHeaderRow.append(tableHead);
            }
        
        for(let i = 1; i < sampleData.length; i++){
            for(const obj of sampleData[i]){
                let row = document.getElementById("fileBody" + i);
                const tableData = document.createElement("td");

                tableData.innerText = obj;
                row.append(tableData);
            }
        } 

    });
    

}

  
}


//on click of PICK NAME runs function
btn.addEventListener('click', function() {
        if(data.length === 0){
            data = JSON.parse(sessionStorage.getItem('sheet'));
        }
        
        if(names.children.length > 1){
            return;
        }else{
    
        //this counter keeps track of how many rows we have gone through
        let counter = 0;
        
        //sets empty data array to the rows created from promise;
        let fileSize = data.length;
        const displayCheckBoxes = document.querySelectorAll("#displayCheck");

        //a while loop that will keep looping while it's less than the length of the data array\
        try{
        while(counter < fileSize - winnerId.length){
            
            //randomly picks 1 person from excel sheet
            let player = Math.floor(Math.random() * fileSize);

            //checks to see if the email/ticket number matches those from previous winners 
            //only matters if you want to exclude previous winners
            if(winnerId.includes(player)){
             
            continue;
            //checks to see if the player has already been picked
            }if(!exclusions.includes(player)){

        //insert switch case here to edit how a player is saved
        let person =[];
        function entry(player){
            for(let i = 0; i < displayCheckBoxes.length; i++){
                if((displayCheckBoxes[i].checked === true) && (person.length === 0)){
                    person[0] = data[player][i].toUpperCase();
                
            }else if((displayCheckBoxes[i].checked === true) && (person.length > 0)){
                person[0] += " " + data[player][i].toUpperCase();
       
            }else if((displayCheckBoxes[i].checked === false) && (person[1] === undefined)){
                person[1] = data[player][i];
        
            }else{
                person[1] += " - " + data[player][i];
        
            }
        }
    }
    entry(player);
            
            //Creates a 'person' array of the first and last name as 1 string, and their email(or third column) as the second string
            
            //adds the 'person' to the 'players' array above
            players.push(person);
            
            //adds the index of the player to the exclusions array
              exclusions.push(player);

            //adds 1 to the counter above
            counter++;
            
         }
        
    } 
} catch(err){
    alert("Oops! There seems to be an empty cell(s)/numbers in the A or B column of the file. Upload again once fixed. Error: " + err);
    return;
}
        //uncomment below to see each 'players' array created
        //console.log(players)

        //loops through the 'players', adds an LI element with the name of the 'person'
        for(let i = 0; i < players.length; i++){
            let li=document.createElement('li');
            names.appendChild(li);
            li.innerHTML=players[i][0];
        };
        //adds the 'list' class to the UL element to start the scroll animation
        names.classList.add('list');
        
        //changes the transform property based on the length of the excel sheet
        try{
        root.style.setProperty('--doc-length', ((-100 / fileSize) * (fileSize - 1) + '%'));
        }catch(e){
            console.error(e instanceof SyntaxError);
              console.error(e.message);
              console.error(e.name);
              console.error(e.fileName);
              console.error(e.lineNumber);
              console.error(e.columnNumber);
              console.error(e.stack);
              alert(e + ": That's not a good error. There might not be enough rows. Take a look and then reupload.")
        };
        
        //adds the celebrate class to the "congrats" element
        const confettiBox = document.getElementById("confettiBox");
        congrats.classList.add('celebrate');
        (!confettiBox.checked)?confettiTimer():"";
        
        
        //logs the last 'person' to the console, aka. The Winner and their email
         console.log(players[players.length-1]);
      
        
        //creates adate based on the computers date and time
        const time = new Date();
        let now = time.toLocaleString();
        
        //creates key/value pair of the winner into the local storage with the date as the key and winner name as the value
        localStorage.setItem(now,players[players.length-1]);
        
        //creates a "winner" object with "date","name","contact"
        let winner = {
            date: now,
            name: players[players.length-1][0],
            contact: String(players[players.length-1][1])
        };
        
//			//adds "winner" object to GLOBAL "winners" array up top
//			winners.push(winner);
//
        // checks to see if localstorage has a list of winners (names) already
        //updates the localstorage key(names) with the updated "winners" array (adds redundancy)
        if(localStorage.getItem('names') !== null && winners.length === 0){
        
        //if 'names' key DOES EXIST, then the 'winners' array will be set to the current list in localstorage
        winners = JSON.parse(localStorage.getItem('names'));
        
        //adds "winner" object to GLOBAL "winners" array up top and the winner exclusion list
        winners.push(winner);
        winnerId.push(exclusions[exclusions.length - 1]);
       
        //sets the 'names' value to the updated 'winners' array	
        localStorage.setItem('names', JSON.stringify(winners));
            
        }else{
            
            //adds "winner" object to GLOBAL "winners" array up top
        winners.push(winner);
        winnerId.push(exclusions[exclusions.length - 1]);
     
        
        //sets the 'names' value to the updated 'winners' array	
        localStorage.setItem('names', JSON.stringify(winners));
        };
        
    }
    console.log(winnerId)
});
function confettiTimer(){
    setTimeout(function(){
        confettiImg.src = "/confetti.gif";
        confetti.classList.add('end-celebrate');
        setTimeout(function(){
            confettiImg.src = "";
            confetti.classList.remove('end-celebrate');
        },5400)
    }, (Number(sliderValue.value) + 0.5) * 1000);
}
//resets the raffle game
reset.addEventListener('click', function(){
        clearTimeout(confettiTimer)
        //deletes all LI elements
        names.innerHTML = '';
        
        //empties the 'players' array
        players.length = 0;
        exclusions.length = 0;

        //if the box is not checked, it empties the winner(s) to exclude from each new drawing
        if(!excludeWinners.checked){
            winnerId.length = 0;
            //console.log(winnerId)
        }
        
        //removes the animation class from th UL element
        names.classList.remove('list');
        congrats.classList.remove('celebrate');
        
        //creates an empty LI element in the UL element(makes the animation look cleaner)
        let li = document.createElement('li');
        names.appendChild(li);
        //console.log(winnerId)
});

//clears browser of localstorage of winners
function clearLocalStorage(){
localStorage.clear();

//sets global 'winners' array to 0
winners.length = 0;
winnerId.length = 0;
};

//creates excel file of winners in localstorage and auto-downloads to computer
function exportPage(){
const results = JSON.parse(localStorage.names);
const schema = [
{
column: 'Date/Time',
type: String,
value: results => results.date
},
{
column: 'Winner',
type: String,
value: results => results.name
},
{
column: 'Ticket/Email',
type: String,
value: results => results.contact
}
];
writeXlsxFile(results,{schema, 
fileName: 'raffleWinners.xlsx'
})
};
// function swapClass(){
// let panel = document.getElementById('panel-body');
// if(!panel.classList.contains('slide-in') && !panel.classList.contains('slide-out')){
//     panel.classList.add('slide-in');
// }else{
// panel.classList.toggle('slide-out');
// panel.classList.toggle('slide-in');

// }
// };

//changes the text above the selector box after each press of a key //text will be automatically capitalized
raffleTitle.addEventListener('keyup', () =>{
subject.textContent = raffleTitle.value;
sessionStorage.setItem('title', raffleTitle.value);
});

//shows the animation duration for from the slider
duration.innerHTML = "Duration: " + sliderValue.value + " seconds";
//sets the animation duration
sliderValue.oninput = function() {
  duration.innerHTML ="Duration: " + this.value + " seconds";
  //uses a try block to set the animation duration in the css to the slider value above
  //value is also set for the congratulations below name box
  try{
    root.style.setProperty('--slider-value', sliderValue.value + "s");
    }catch(e){
        console.error(e instanceof SyntaxError);
          console.error(e.message);
          console.error(e.name);
          console.error(e.fileName);
          console.error(e.lineNumber);
          console.error(e.columnNumber);
          console.error(e.stack);
    };
};

const  bgSelector = document.getElementById('bg-select');
const  gradBox = document.getElementById('gradient');
const  imgBox = document.getElementById('img-input');
const  imgUpload = document.getElementById('img-upload');
const  imgLink = document.getElementById('img-link');
const  grad2 = document.getElementById('grad2');
const  grad3 = document.getElementById('grad3');
const  xDir = document.getElementById('left-right');
const  yDir = document.getElementById('top-bottom');
const  xAxisArr = document.getElementsByName('xAxisRadios');
const  yAxisArr = document.getElementsByName('yAxisRadios');
const congratsBox = document.getElementById('congratsBox');
const congratsBlock = document.getElementById('hide-congrats');
const confettiBox = document.getElementById("confettiBox");
const  carouselBox = document.getElementById('hideCarousel');
const  carouselBlock = document.querySelector('.carousel');
const carouselBody = document.querySelector('.carousel-inner');
const carUpload = document.getElementById('car-upload');
function setDefaults(){
    if(sessionStorage.getItem('title') !== null){
        subject.textContent = sessionStorage.getItem('title');
    }
    sliderValue.value = 5;
    duration.innerHTML = "Duration: " + sliderValue.value + " seconds";
    bgSelector.value = "default";
    imgLink.value = "";
    imgUpload.value="";
    grad2.value = `#6a85b6`;
    grad3.value = `#bac8e0`;
    congratsBox.checked = true;
    confettiBox.checked = true;
    carouselBox.checked = true;
    clearCarousel();
    hideCongrats();

}
function hideCongrats(){
    (congratsBox.checked)?congratsBlock.classList.add("visually-hidden"):congratsBlock.classList.remove("visually-hidden");

}

bgSelector.oninput = ()=>{
    try{
        if(bgSelector.value === "gradient"){
            gradBox.classList.remove('visually-hidden');
            imgBox.classList.add('visually-hidden');
            body.style.removeProperty('background-image');
            root.style.setProperty('--grad2-value', grad2.value)
            let gradientValues = {
                color1:grad2.value,
                color2:grad3.value,
            };

            grad2.oninput = ()=>{
                root.style.setProperty('--grad2-value', grad2.value)
            }
            grad3.oninput = ()=>{
                root.style.setProperty('--grad3-value', grad3.value)
            }
            xDir.onclick = ()=>{
                for (i = 0; i < xAxisArr.length; i++) {
                    if (xAxisArr[i].checked)
                    root.style.setProperty('--grad-xAxis', xAxisArr[i].value)
                }
            }
            yDir.onclick = ()=>{
                for (i = 0; i < yAxisArr.length; i++) {
                    if (yAxisArr[i].checked)
                    root.style.setProperty('--grad-yAxis', yAxisArr[i].value)
                }
            }

        }else if(bgSelector.value === "image"){
            gradBox.classList.add('visually-hidden');
            imgBox.classList.remove('visually-hidden');
            
            imgLink.oninput = ()=>{
                if(imgLink.value.trim() === ""){
                    body.style.removeProperty('background-image');
                    return;
                }
                body.style.setProperty('background-image', `url(${imgLink.value})`)
            }
            imgUpload.oninput = ()=>{
                let ele = imgUpload.files[0];
                let bgImg = URL.createObjectURL(ele);
                localStorage.setItem('bgImg', JSON.stringify(bgImg));
                body.style.setProperty('background-image', `url(${bgImg})`)

                console.log(ele, bgImg)
            }

        }else{
            gradBox.classList.add('visually-hidden');
            imgBox.classList.add('visually-hidden');
        }

        }catch(e){
        console.error(e instanceof SyntaxError);
          console.error(e.message);
          console.error(e.name);
          console.error(e.fileName);
          console.error(e.lineNumber);
          console.error(e.columnNumber);
          console.error(e.stack);
    };
};

function buildCarousel(){
    let carItem = document.querySelector('.firstCar');
    
    for(let i = 0; i < carUpload.files.length; i++){
        let carSrc = URL.createObjectURL(carUpload.files[i]);
        carouselBody.appendChild(carItem.cloneNode(true));
        carouselBody.children[i].classList.add('carousel-item');
        carouselBody.children[i].classList.remove('firstCar', 'visually-hidden');
        carouselBody.children[i].children[0].src = carSrc;
        carouselBody.children[i].children[0].alt = carUpload.files[i].name;
    }
    carouselBody.firstElementChild.classList.add('active');
    //document.querySelector('.carousel').classList.remove('visually-hidden');
    carouselBox.checked = false;
    hideCarousel();
}

function hideCarousel(){
    if(carouselBox.checked){
        carouselBlock.classList.add("visually-hidden")
        root.style.setProperty('--box-margin', "18%")
    }else if(!carouselBox.checked){
        carouselBlock.classList.remove("visually-hidden")
        root.style.setProperty('--box-margin', "10%")
    }
}

function clearCarousel(){
    carouselBox.checked = true;
    hideCarousel();
    carouselBody.innerHTML = "";
    carUpload.value = "";
}
