# excel-scroll-winner
Link to the working version [Raffle Spinner Link](https://rafflespinner.netlify.app) 

Firefox works best for all data set sizes and duration.

Chrome has issues animating names with large sets (1500+ rows) and short duration (8 seconds or less). Increase duration for proper animation.

Test data is available to download in the project folder.
Text/image safezones for a custom background are also in the folder as well as the photoshop file. (1920x1080)

# Vertically-scrolling Text

A Pen created on CodePen.io. Original URL: [https://codepen.io/donconn3/pen/ZEqXKEJ](https://codepen.io/donconn3/pen/ZEqXKEJ).

Vertiaclly-scrolling list that has the appearance of fading in and out.

The source for the animation was from a PEN on CodePen(wish I could find it again).

Uses read-excel-file.js, write-excel-file.js, Boostrap 5.3; written mostly in vanilla JS, HTML, and CSS. 
<h3>(tl;dr)Basic steps:</h3>
<ol>
  <li>Upload an excel file (.xls or .xlsx)</li>
 <li>Add Title</li>
 <li>Set raffle duration</li>
 <li>Change background/gradient</li>
 <li>Pick name</li>
 <li>Download Winner(s) </li>
</ol>
  
<h3>How to use the page:</h3>
  <h4>File Format:</h4>
  <ol>
    <li>The file format must be .xls or .xlsx</li>
<li>ONLY Column 1 and Column 2 of the excel sheet is displayed (firstName lastName) but column 3 is also read
<li>Empty Cells throw an error so make sure Col 1, Col 2, and Col 3 are all filled
<li>Col 3 can be any information you want (phone, email, raffle #, ticket #, etc.)
<li>The program has worked with over 28,000 rows with 2 columns & over 14,000 rows with 3 columns
  </ol>
  <h4>Operation:</h4>
  <ol>
<li>Upload your file
  <li>Change the name of the raffle and the duration</li>
    <li>Click the checkbox if you want to exclude winners from each drawing or keep them in each time</li>
<li>Click "Pick Name" (winner is the last person in the 'players' array created below. Winner(s) is logged to the console and in localStorage)
<li>Once the names stop scrolling, you will have your winner
<li>To draw another name, click "New Drawing" and then repeat Step 4
<li>To download the Winner information, click hamburger icon and then click "Download Winners".
<li>This will download an excel sheet to your computer with the: DATE+TIME each winner was picked, NAME of the winner(s) and the - phone, email, raffle #, ticket #, etc.- of winner(s) 
<li>i) DO NOT CLICK "DELETE DRAWING" BEFORE YOU CLICK "DOWNLOAD WINNERS" OR ALL WINNER INFORMATION WILL BE LOST!</strong>
<li>ii) To start a new drawing with a new list, Complete Step 5, then hit click "Delete Drawing", and then repeat from Step 1
  </ol>

  <h4>How it Works:</h4>
  <ol>
<li>The "readexcelfile" reads each row making an array-of-arrays (sheet = main array, each row = sub-array)
<li>A "player" is created and assigned a random number which indicates their index position in the array
<li>While the "counter" is less than the number of rows, 
    the new "player" is checked against an exclusion array that checks to see if the new "player" has been picked already
<li>If the "player" has been picked, then the loop restarts
<li>If the "player" has NOT been picked, then a "person" is created using the "player" index 
    and added to the "players" array and the "counter" goes up by 1
<li> Once the "players" array is finished, a for-loop creates a <li> tag for each "person"
<li>When the "Pick Name" button is clicked, the list of names is scrolled until the "winner" (last <li> tag) appears
<li> When the "New Drawing" button is clicked, the "players" and  "exclusions" arrays are emptied, and the internal "counter" is reset to 0
  </ol>
  
<h4>Future Updates</h4>
<ul>
  <li>add carusel of images to show potential prizes :white_check_mark:</li>
  <li>collapsible menu sections</li>
  <li>tips/instructions at the bottom of each section for instruction</li>
  <li>select which columns to read from</li>
  <li>write in names instead of uploading a file</li>
  <li>download winners as a pdf/.doc as wells as spreadsheet</li>
  <li>Far down the road: profiles/layouts, more control over text/font/colors</li>
</ul>
