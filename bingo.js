// important: make a clickable grid
/* when draw updates
- when user or someone else has clicked
- when resizing the window
*/
// --> constant read-out of database --> check the 4wins3loses approach
// store the timing of a phrase


// event listener setup
window.addEventListener('resize', change_size);
window.addEventListener('click', clicked); // TODO make sure it works on phones

// basic setup: grid and updates when clicked

class Grid {
    constructor(hn=grid_h_n, vn=grid_v_n) {
        this.hn = hn;
        this.vn = vn;
        this.lines = this.init_lines();
        this.clicked_cells = [];
        this.bingo_cells = [];
        this.items = this.define_items();
        this.prev_bingos = [];
    }
    init_lines() {
        this.lines = [];
        for (let xi = 0; xi < this.vn; xi++) {
            let curr_x = xi*canvas.width/this.vn;
            this.lines.push([{x: curr_x, y: 0}, {x: curr_x, y: canvas.height}]);
        }
        for (let yi = 0; yi < this.hn; yi++) {
            let curr_y = yi*canvas.height/this.hn;
            this.lines.push([{x: 0, y: curr_y}, {x: canvas.width, y: curr_y}]);
        }
    }
    define_items() {
        var grid_items = [];
        // select or fill until the items are used
        if (items.length >= n_items) {
            // only draw each item once
            shuffle(items);
            grid_items = items.slice(0, n_items);
        } else {
            // draw randomly, items appear multiple times
            for (let i = 0; i < n_items; i++) {
                // TODO maybe there is a cleaner way
                grid_items.push(items[Math.round(Math.random()*(items.length-1))]);
            }
        }
        return grid_items;
    }
    click(x, y) {
        // identify the clicked cell
        for (let xi = 0; xi < this.vn; xi++) {
            for (let yi = 0; yi < this.hn; yi++) {
                if (x >= xi*canvas.width/this.vn  && x <= (xi + 1)*canvas.width/this.vn
                &&  y >= yi*canvas.height/this.hn && y <= (yi + 1)*canvas.height/this.hn) {
                    // check if this cell already exists
                    for (let ci = 0; ci < this.clicked_cells.length; ci++) {
                        const c = this.clicked_cells[ci];
                        if (xi == c.x && yi == c.y) {
                            return;
                        }
                    }
                    this.clicked_cells.push({x: xi, y: yi});
                    return;
                }
            }
        }
    }
    test_if_prev_bingo() {
        // check if not in previous bingo
        for (let pbi = 0; pbi < this.prev_bingos.length; pbi++) {
            const pb = this.prev_bingos[pbi];
            var all_matches = [];
            for (let bci = 0; bci < this.bingo_cells.length; bci++) {
                const bc = this.bingo_cells[bci];
                var match = false;
                for (let pbci = 0; pbci < pb.length; pbci++) {
                    const pbc = pb[pbci];
                    if (bc.x == pbc.x && bc.y == pbc.y) {
                        match = true;
                        break;
                    }
                }
                if (match) all_matches.push(true);
                else all_matches.push(false);
            }
            if (all_matches.every(function(x){return x == true;})) {
                this.bingo_cells = []; // reset
                return true;
            }
        }
        return false;
    }
    check_bingo() {
        // TODO make case distinction for non-square grids
        // TODO (?) problem: only finds the first bingo

        this.bingo_cells = []; // reset

        var valid_bingos = [];

        // column-wise search
        for (let xi = 0; xi < this.vn; xi++) {
            this.bingo_cells = []; // reset
            var all_valid = true;
            for (let yi = 0; yi < this.hn; yi++) {
                var in_selected = false;
                for (let ci = 0; ci < this.clicked_cells.length; ci++) {
                    const c = this.clicked_cells[ci];
                    if (c.x == xi && c.y == yi) {
                        in_selected = true;
                        this.bingo_cells.push({x: xi, y: yi});
                        break;
                    }
                }
                if (!in_selected) {
                    all_valid = false;
                    break;
                }
            }
            if (all_valid) {
                if (this.test_if_prev_bingo()) continue;
                else valid_bingos.push(this.bingo_cells);
            }
        }

        // row-wise search
        for (let yi = 0; yi < this.hn; yi++) {
            this.bingo_cells = []; // reset
            var all_valid = true;
            for (let xi = 0; xi < this.vn; xi++) {
                var in_selected = false;
                for (let ci = 0; ci < this.clicked_cells.length; ci++) {
                    const c = this.clicked_cells[ci];
                    if (c.x == xi && c.y == yi) {
                        in_selected = true;
                        this.bingo_cells.push({x: xi, y: yi});
                        break;
                    }
                }
                if (!in_selected) {
                    all_valid = false;
                    break;
                }
            }
            if (all_valid) {
                if(this.test_if_prev_bingo()) continue;
                else valid_bingos.push(this.bingo_cells);
            }
        }

        // check the diagonals

        // diagonal 1 (\)
        this.bingo_cells = []; // reset
        var all_valid = true;
        for (let di = 0; di < this.hn; di++) {
            var in_selected = false;
            for (let ci = 0; ci < this.clicked_cells.length; ci++) {
                const c = this.clicked_cells[ci];
                if (c.x == di && c.y == di) {
                    in_selected = true;
                    this.bingo_cells.push({x: di, y: di});
                    break;
                }
            }
            if (!in_selected) {
                all_valid = false;
                break;
            }
        }
        if (all_valid) {
            if (this.test_if_prev_bingo() == false) {
                valid_bingos.push(this.bingo_cells);
            }
        }

        // diagonal 2 (/)
        this.bingo_cells = []; // reset
        var all_valid = true;
        for (let di = 0; di < this.hn; di++) {
            var in_selected = false;
            for (let ci = 0; ci < this.clicked_cells.length; ci++) {
                const c = this.clicked_cells[ci];
                if (c.x == di && c.y == (this.hn - 1 - di)) {
                    in_selected = true;
                    this.bingo_cells.push({x: di, y: (this.hn - 1 - di)});
                    break;
                }
            }
            if (!in_selected) {
                all_valid = false;
                break;
            }
        }
        if (all_valid) {
            if (this.test_if_prev_bingo() == false) {
                valid_bingos.push(this.bingo_cells);
            }
        }

        this.bingo_cells = []; // reset
        for (let vbi = 0; vbi < valid_bingos.length; vbi++) {
            const vb = valid_bingos[vbi];
            for (let vbci = 0; vbci < vb.length; vbci++) {
                const vbc = vb[vbci];
                this.bingo_cells.push(vbc);
            }
        }
        

    }
    update() {
        this.init_lines();
        this.check_bingo();
        if (this.bingo_cells.length > 0) {
            this.prev_bingos.push(this.bingo_cells);
        }
    }
    render() {

        // draw the lines
        for (let li = 0; li < this.lines.length; li++) {
            const l = this.lines[li];
            draw_line(l[0], l[1]);
        }

        // draw the text
        var i = 0;
        for (let xi = 0; xi < this.vn; xi++) {
            for (let yi = 0; yi < this.hn; yi++) {
                let x = xi*canvas.width/this.vn + (canvas.width/this.vn)/2;
                let y = (yi+1)*canvas.height/this.hn;
                draw_text(this.items[i], 0, {x: x, y: y});
                i++;
            }
        }

        // highlight the clicked ones
        for (let ci = 0; ci < this.clicked_cells.length; ci++) {
            const c = this.clicked_cells[ci];
            highlight_box(c.x*(canvas.width/this.vn), c.y*(canvas.height/this.hn), canvas.width/this.vn, canvas.height/this.hn);
        }
        // highlight the bingo cells
        for (let ci = 0; ci < this.bingo_cells.length; ci++) {
            const c = this.bingo_cells[ci];
            draw_bingo_cell(c.x*(canvas.width/this.vn), c.y*(canvas.height/this.hn), canvas.width/this.vn, canvas.height/this.hn);
        }
        
        if (this.bingo_cells.length > 0) {
            draw_text(["BINGO!"], canvas.height/3, {x: canvas.width/2, y: canvas.height/2 + (canvas.height/3)/2}, "rgba(255,0,0,0.7)");
        }

    }
}

// init objects
var grid = new Grid();

// update and draw functions
function update() {
    // TODO add rest
    grid.update();
    draw();
}

function draw() {
    clear_canvas();
    if (canvas.width < canvas.height) draw_text(["TILT",
    "","","","","","","","","","","","","","","","","","","","","",
    "YOUR",
    "","","","","","","","","","","","","","","","","","","","","",
    "PHONE"], canvas.height/6);
    else grid.render();
}

// listener functions
function change_size() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    update();
}

function clicked(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    grid.click(x, y);
    update();
}

// get bingo game STARTED
update();