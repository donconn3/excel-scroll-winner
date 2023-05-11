# excel-scroll-winner

# Vertically-scrolling Text

A Pen created on CodePen.io. Original URL: [https://codepen.io/donconn3/pen/ZEqXKEJ](https://codepen.io/donconn3/pen/ZEqXKEJ).

Vertiaclly-scrolling list that has the appearance of fading in and out.

The source for the animation was from a PEN on CodePen(wish I could find it again).

Uses read-excel-file.js, write-excel-file.js, Boostrap 3; written mostly in vanilla JS, HTML, and CSS. 
<h2><tl;dr><h2>
<h3>Basic steps:</h3>
<ol>
  <li>Upload an excel file</li>
 <li>Change Title</li>
 <li>Set raffle duration</li>
 <li>Pick name</li>
 <li>Download Winner(s) </li>
</ol>
  
<h3>How to use the page:<h3>
File Format:
1) The file format must be .xls or .xlsx
2) ONLY Column 1 and Column 2 of the excel sheet is displayed (firstName lastName) but column 3 is also read
3) Empty Cells throw an error so make sure Col 1, Col 2, and Col 3 are all filled
4) Col 3 can be any information you want (phone, email, raffle #, ticket #, etc.)
i) The program has worked with over 28,000 rows with 2 columns & over 14,000 rows with 3 columns

  <h3>Operation:</h3>
1) Upload your file
2) Click "Pick Name" (winner is the last person in the 'players' array created below. Winner(s) is logged to the console and in localStorage)
3) Once the names stop scrolling, you will have your winner and "Congratualtions" will appear
4) To draw another name, click "New Drawing" and then repeat Step 2
5.0) To download the Winner information, click hamburger icon and then click "Download Winners".
5.1) This will download an excel sheet to your computer with the: DATE+TIME each winner was picked, NAME of the winner(s),(phone, email, raffle #, ticket #, etc.) of winner(s) 
<strong>i) DO NOT CLICK "CLEAR LOCAL STORAGE" BEFORE YOU CLICK "DOWNLOAD WINNERS" OR ALL WINNER INFORMATION WILL BE LOST!</strong>
ii) To start a new drawing with a new list, Complete Step 5, then hit click "Clear Local Storage", and then repeat from Step 1

  <h3>How it Works:</h3>
1) The "readexcelfile" reads each row making an array-of-arrays (sheet = main array, each row = sub-array)
2) A "player" is created and assigned a random number which indicates their index position in the array
3.0) While the "counter" is less than the number of rows (numOfROws - 1), 
    the "player" is checked against an exclusion array that checks to see if that "player" has been picked already
3.1) If the "player" has been picked, then the loop restarts
3.2) If the "player" has NOT been picked, then a "person" is created using the "player" index 
    and added to the "players" array and the "counter" goes up by 1
4) Once the "players" array is finished, a for-loop creates a <li> tag for each "person"
5) When the "Pick Name" button is clicked, the list of names is scrolled until the "winner" (last <li> tag) appears
6) When the "New Drawing" button is clicked, the "players" and  "exclusions" arrays are emptied, and the internal "counter" is reset to 0

