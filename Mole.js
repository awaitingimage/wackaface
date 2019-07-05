export default class Mole {
  constructor(gridArea, callback) {
    this.gridArea = gridArea;
    this.callback = callback;
    this.type = "";
    this.hit = false;
    this.timeAlive = 3000;
    this.removeTime = 2000;
  }

  kill() {
    $(this.divElement).removeClass("alive");
    $(this.divElement).addClass("killed");
    this.hit = true;

    setTimeout(this.remove.bind(this), this.removeTime);
  }

  remove() {
    $(this.divElement).remove();
    this.callback(this.gridArea, this.points);
  }

  removeWithoutKill() {
    $(this.divElement).addClass("removed");
    if (!this.hit) this.points = 0;
    setTimeout(this.remove.bind(this), this.removeTime);
  }

  render(grid) {
    let svgElement = $(this.svg);
    svgElement.addClass("alive");
    svgElement.click($.proxy(this.kill, this));
    this.divElement = $(`<div class="${this.type}"></div>`).append(svgElement);
    this.divElement.css("grid-area", this.gridArea);
    grid.append(this.divElement);

    setTimeout(this.removeWithoutKill.bind(this), this.timeAlive);
  }
}
