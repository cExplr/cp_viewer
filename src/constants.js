// This is just CP viewer
const EDGE = 1
const MOUNTAIN = 2
const VALLEY = 3
const DEFAULT = 100;

let start_x = 15;
let start_y = 15;

let boundary_list = [];

// Things we can let user set at the end of the day
let num_grid = 17;

let display_scale = 1;
let display_scale_increment = 0.07;
let display_scale_decrement = 0.07;

let pan_factor = 0.8;
let max_pan_width = window.innerWidth*50;
let curr_zoom = 1;
let zoom_factor = 0.06; // best to be non multiple of width because of div by 0
let zoom_offset_x = 0;
let zoom_offset_y = 0;

let min_display_scale = 0; //display_scale_decrement;
let paper_size = 500;
let canvas_size_x = screen.width;
let canvas_size_y = screen.height*0.7;


let delta_min_xy_list = [];

let enable_dark_theme = false;
