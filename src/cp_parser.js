



// This class contains functions that allows for parsing of cp into my own JSON format.
// Might want to consider strategy pattern for different kinds of CP format.
// For now, no strategy pattern is used because i am now concentrating on just .cp file format
class CP_Parser {
    
    constructor(){
        this.utils = new Utils();
        this.parsed_data = {};
        
        //let num_of_lines = 0;

        let onFileSelect = (evt)=>{
            console.log("FILE SELECTED")
            display_scale =1;
            let file_path = evt.target.value
            let file_object = evt.target.files[0]
            if(this.utils.get_file_extension(file_path) === "cp"){
                console.log(".cp file detected!")
            }
    
            // Read file from the file object with FileReader
            let reader = new FileReader();
            reader.addEventListener('load',()=>{
                this.parsed_data = this.parse_cp_data(reader.result)
            },false);
    
            if(file_object){
                reader.readAsText(file_object);
            }else{
                console.log("Input file to start parsing")
            }
            
        }
        // Make sure that DOM objects are loaded before setting event listener.
        // If file is uploaded, then parse and create teh JSON data
        window.addEventListener(
            'DOMContentLoaded',
            ()=>{ 
                document.addEventListener('touchmove', function (event) {
                    if (event.scale !== 1) { event.preventDefault(); }
                  }, false);
                  
                document.addEventListener('gesturestart', function(e) {
                    e.preventDefault();
                    // special hack to prevent zoom-to-tabs gesture in safari
                    document.body.style.zoom = 0.99;
                });
                
                document.addEventListener('gesturechange', function(e) {
                    e.preventDefault();
                    // special hack to prevent zoom-to-tabs gesture in safari
                    document.body.style.zoom = 0.99;
                });
                
                document.addEventListener('gestureend', function(e) {
                    e.preventDefault();
                    // special hack to prevent zoom-to-tabs gesture in safari
                    document.body.style.zoom = 0.99;
                });


                document.getElementById("file_upload")
                    .addEventListener(
                        'change',
                        onFileSelect, // the handler for when file is selected leading to change
                        false
                    ); 
                document.getElementById("darkmode-option").addEventListener("change",()=>{
                    enable_dark_theme = !enable_dark_theme;
                  });

                document.getElementById("zoom-in-option").addEventListener("click", (e)=>{
                    curr_zoom += 0.1;
                });

                document.getElementById("zoom-out-option").addEventListener("click", (e)=>{
                    curr_zoom -= 0.1;
                });

                document.getElementById("save-png-option").addEventListener("click", (e)=>{
                    save(document.getElementById("file_upload").files[0].name + ".png");
                    print("SVG Exported");
                });

                }

               
            );
            

    } // end constructor
    

    // main parsing function of .cp file to json data
    // of .cp file
    // cp_file_content contains the whole text data in .cp file
    parse_cp_data (cp_file_content){
        this.parsed_data = {};
        let cp_data_arr = cp_file_content.split("\n");
        //this.extract_info_from_cp_data(cp_data_arr);
        //now we will write everything to json but after that, we want to 
        // optimize by extracting all to points and lines arrays
        for(var i in cp_data_arr){
            if(cp_data_arr[i] == undefined) continue;
            let data = cp_data_arr[i].split(" ")
            let fold_type = parseInt(data[0]);
            let x1 = parseFloat(data[1]);
            let y1 = parseFloat(data[2]);
            let x2 = parseFloat(data[3]);
            let y2 = parseFloat(data[4]);
        
            let p1 = createVector(x1,y1);
            let p2 = createVector(x2,y2);
            this.parsed_data[i] = {
                "type":fold_type,
                "p1":p1,
                "p2":p2
            }
        }

        this.parsed_data["num_of_lines"] = parseInt(cp_data_arr.length-1)
        console.log("Initializing cp_data_arr ...");
        console.log("num of lines : " , this.parsed_data["num_of_lines"])
        this.utils.get_boundaries_from_cp_data (); // calculate boundaries before calcuating translate deltas
        this.utils.calculate_translate_deltas(this.parsed_data); // get translation delta so that we can draw the cp starting from within canvas
        return this.parsed_data;
    }  // end parse_cp_data

} // END CP_Parser class
