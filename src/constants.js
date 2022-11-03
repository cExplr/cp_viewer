// This is just CP viewer
const EDGE = 1
const MOUNTAIN = 2
const VALLEY = 3
const DEFAULT = 100;

let start_x = 50;
let start_y = 50;

// Things we can let user set at the end of the day
let num_grid = 17;

let display_scale = 1;
let display_scale_increment = 0.07;
let display_scale_decrement = 0.07;

let pan_factor = 0.8;
let max_pan_width = window.innerWidth*50;


let min_display_scale = 0; //display_scale_decrement;
let paper_size = 500;
let canvas_size_x = screen.width;
let canvas_size_y = screen.height*0.7;

//0h_Ilovecrazyman!!!
