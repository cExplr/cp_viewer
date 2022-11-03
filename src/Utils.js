class Utils {
    constructor(){}
    // gets extension naively from full file path
    get_file_extension(filepath){
        return filepath.split('.').pop();
    }


    // Need to know the boundary by running utils.get_boundaries_from_cpdata first
    // returns list of delta_min_x and delta_min_y
    calculate_translate_deltas(parsed_cp_data){
        delta_min_x = 0;
        delta_min_y = 0;
        let boundary_list = this.get_boundaries_from_cp_data(parsed_cp_data);
        min_vector = boundary_list[0];
        max_vector = boundary_list[1];
        if (min_vector.x < 0 ){
        delta_min_x -= min_vector.x;
        delta_min_x += start_x;
        }
        if (min_vector.y < 0 ){
        delta_min_y -= min_vector.y;
        delta_min_y += start_y;
        }
        console.log("Delta_min_x" , delta_min_x)
        console.log("Delta_min_y" , delta_min_y)

        let delta_min_xy_list = [];
        delta_min_xy_list.push(delta_min_x);
        delta_min_xy_list.push(delta_min_y);

        return delta_min_xy_list;
    }
  
    // get_deltas_from_boundaries()
    //   update the deltas ( values that we need to add to the values from the parsed json data)
    //   so that we can draw from (0,0) from the screen 
    //   and also calculate the max x and max y so that they would also be within the canvas
    // returns array of min vector and max vector
    get_boundaries_from_cp_data(parsed_cp_data){
        let min_x = Infinity;
        let min_y = Infinity;
        let max_x = -Infinity;
        let max_y = -Infinity;
        
        for ( var i in parsed_cp_data ) {
            var line_data = parsed_cp_data[i];
            // only interested in the edge for now (can actually choose for non edge actually now that i thnk about it)
            if (line_data.type == EDGE){ 
                min_x = Math.min(Math.min(line_data.p1.x,line_data.p2.x), min_x)
                min_y = Math.min(Math.min(line_data.p1.y,line_data.p2.y), min_y)
                max_x = Math.max(Math.max(line_data.p1.x,line_data.p2.x), max_x)
                max_y = Math.max(Math.max(line_data.p2.x,line_data.p2.y), max_y)
            }
        }
        let min_max_vector_list = [];
        min_max_vector_list.push(createVector(min_x, min_y));
        min_max_vector_list.push(createVector(max_x, max_y));
        
        return min_max_vector_list;
        
    }

    // deals with what happens when file gets selected
    
    
}