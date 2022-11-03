// This is the actual file where everything starts from



let grid_width = paper_size / num_grid
let grid_size = grid_width * num_grid;



// this is used to offset because we want everything to start with 
// (0,0) but cp can start from negative
// e.g. if (-200,-200) then we need to add delta of 0-(-200) each = 200
let delta_min_x = 0; 
let delta_min_y = 0;

// min and max vectors contains the boundaries of cp data
let min_vector;
let max_vector;

// scale is the factor in which we want to multiply so that it can fit into the screen 
// perfectly




let parser = new CP_Parser();

function setup() {
  // put setup code here
  // shall contain all the data lines in an array 
  
  var canvas = createCanvas(canvas_size_x,canvas_size_y);
}

function draw() {
  // put drawing code here
  background(255);
  set_line_based_on_fold_type(DEFAULT);
  drawGrid();
  
  drawCP(parser.parsed_data);
}

function drawCP(parsed_cp_data){
  for(var data in parsed_cp_data){
    var data = parsed_cp_data[data];
    if(data.type == NaN || data.type==undefined) continue;
    set_line_based_on_fold_type(data.type)

    let x1 = display_scale*(data.p1.x )+ delta_min_x;
    let y1 = display_scale*(data.p1.y) + delta_min_y;
    let x2 =  display_scale*(data.p2.x )+ delta_min_x;
    let y2 = display_scale*(data.p2.y )+ delta_min_y;
    line(x1,y1,x2, y2)
    set_line_based_on_fold_type(DEFAULT);
    fill(255);
    ellipse(x1,y1,3,3);
    ellipse(x2,y2,3,3);
  }
}

function set_line_based_on_fold_type(fold_type_int){
  strokeWeight(.4);
  noFill();
  if(fold_type_int == MOUNTAIN){
    stroke(190,20,20);
  }else if (fold_type_int == VALLEY){
    stroke(20,20,190);
  }
  else if ( fold_type_int == EDGE){
    strokeWeight(1);
    stroke(0);
  }else if (fold_type_int == DEFAULT){
    strokeWeight(1);
    stroke(0);
  }
  else{
    strokeWeight(.7);
    stroke(23,203,180);
  }
  
}





function drawGrid(){

}




// 1 is paper edge
// 2 is mountain
// 3 is valley