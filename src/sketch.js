// This is the actual file where everything starts from

window.addEventListener('mousedown',(e)=>{
  console.log(e.clientX , " , " , e.clientY);
},false)


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

let pan_x = 0;
let pan_y = 0;

let tow = canvas_size_x;
let toh = canvas_size_y;

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
  translate(pan_x, pan_y)
  translate(zoom_offset_x, zoom_offset_y);
  scale(curr_zoom)
  
  
  drawCP(parser.parsed_data);
  
}


/*

// Involves in the panning
function mouseDragged(){
  // panning by calculatin delta value and translating
  //console.log("dragging from " , mouseX, ',',mouseY, ' -- > ', pmouseX, ',',pmouseY)
  pan_x += (mouseX - pmouseX)*pan_factor;
  pan_y += (mouseY - pmouseY)*pan_factor;
  
}
*/

// Involves in the zooming
// Copied blatantly from 
// https://gist.github.com/companje/5478fff07a18a1f4806df4cf77ae1048

function mouseWheel(event){
  const {x,y,deltaY} = event;
  const direction = (deltaY < 0)?-1:1;
  let oldZoom = curr_zoom.toFixed(2);
  if(direction > 0 ){
    console.log("Zooming out"); 
    curr_zoom *= (1/(1+zoom_factor))
    let zoomChange = curr_zoom- oldZoom;
    zoom_offset_x -= (mouseX - pan_x - start_x )* zoomChange;
    zoom_offset_y -= (mouseY - pan_y - start_y) * zoomChange;

  }else{
    console.log("Zooming in ");
    curr_zoom *= (1+zoom_factor);
    let zoomChange = oldZoom - curr_zoom ;
    zoom_offset_x += (mouseX - pan_x - start_x)* zoomChange;
    zoom_offset_y += (mouseY - pan_y - start_y) * zoomChange;
    
  }
  console.log(zoom_offset_x)
  console.log(zoom_offset_y)
  

  return false;
}

function drawCP(parsed_cp_data){
  for(var data in parsed_cp_data){
    var data = parsed_cp_data[data];
    if(data.type == NaN || data.type==undefined) continue;
    set_line_based_on_fold_type(data.type)

    let x1 = data.p1.x + delta_min_x;
    let y1 = data.p1.y + delta_min_y;
    let x2 = data.p2.x + delta_min_x;
    let y2 = data.p2.y+ delta_min_y;
    line(x1,y1,x2, y2)
    set_line_based_on_fold_type(DEFAULT);
    fill(255);
    //ellipse(x1,y1,3,3);
    //ellipse(x2,y2,3,3);
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