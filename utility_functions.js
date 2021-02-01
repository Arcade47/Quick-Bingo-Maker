var canvas = document.getElementById("bingo_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

function clear_canvas() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw_line(coord1, coord2) {
    ctx.beginPath();
    ctx.moveTo(coord1.x, coord1.y);
    ctx.lineTo(coord2.x, coord2.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.min(canvas.width, canvas.height)/100;
    ctx.stroke();
    ctx.closePath();
}

function highlight_box(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    ctx.strokeStyle = "orange";
    ctx.lineWidth = Math.min(canvas.width, canvas.height)/50;
    ctx.stroke();
    ctx.closePath();
}

function draw_bingo_cell(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "rgba(0,255,0,0.5)";
    ctx.fill();
    ctx.closePath();
}

function draw_text(textlines, size=0, pos={x: canvas.width/2, y: canvas.height/2}, color="black") {
    if (size == 0) {
        size = Math.min(canvas.width, canvas.height)/Math.max(grid_h_n, grid_v_n)/textlines.length/2;
    }
    ctx.textAlign = "center";
    // pos.y -= size/(textlines.length + 1);
    ctx.font = String(size)+"px Arial";
    const textline_height = (canvas.height/grid_h_n/textlines.length);
    for (let ti = 0; ti < textlines.length; ti++) {
        const text = textlines[ti];
        ctx.fillStyle = color;
        ctx.fillText(
            text,
            pos.x, 
            pos.y - (textlines.length - 1 - ti)*textline_height - textline_height/2
            );
    }
}

// copied from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}