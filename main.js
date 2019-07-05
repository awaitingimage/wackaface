import "./jquery-3.4.1.js";
import Angry from "./Angry.js";
import Happy from "./Happy.js";

let gridRows = 6;
let gridColumns = 6;
let emptyGridAreas = [];
let filledGridAreas = [];
let gamePoints = 0;

let gridElement = $("#grid");

gridElement.css("grid-template", `repeat(${gridRows}, 1fr) / repeat(${gridColumns}, 1fr)`);

//grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
for (let column = 1; column <= gridColumns; column++) {
  for (let row = 1; row <= gridRows; row++) {
    emptyGridAreas.push(`${row} / ${column} / ${row} / ${column}`);
  }
}

function loop() {
  if (emptyGridAreas.length > 0) {
    let gridAreaIndex = Math.floor(Math.random() * emptyGridAreas.length);

    if (Math.random() < 0.8) {
      filledGridAreas.push(new Angry(emptyGridAreas[gridAreaIndex], die));
    } else {
      filledGridAreas.push(new Happy(emptyGridAreas[gridAreaIndex], die));
    }
    filledGridAreas[filledGridAreas.length - 1].render(gridElement);
    emptyGridAreas.splice(gridAreaIndex, 1);
  }
  $("#points").text(gamePoints);
}

function die(gridArea, points) {
  emptyGridAreas.push(gridArea);
  gamePoints += points;
  filledGridAreas = filledGridAreas.filter(item => item.gridArea != gridArea);
}

setInterval(loop, 1000);
