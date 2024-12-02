const paths = [[[2,0], [5,0], [5,2], [2,2]], //polygon, black line, black fill
	       [[2,6], [5,6], [5,8], [2,8]],
	       [[15,0], [18,0], [18,2], [15,2]],
	       [[15,6], [18,6], [18,8], [15,8]],
	       [[16.5,2], [16.5,6], [14.5,], [4], [16.5,2]], //line, black, no fill
	       [[2,2], [5,2], [7,1], [11,1], [12,2.75], [20,3.5], [18.5,1], [18.5,0], [20,0], [21,4], [20,8], [18.5,8], [18.5,7], [20,4.5], [12,5.25], [11,7], [7,7], [5,6], [2,6]],   //polygon, red line, red fill
	       [[9,1], [8,2], [3,3], [3,5], [8,6], [9,7]], //line, black, no fill
	       [[0,1], [2.5,1], [2.5,7], [0,7]], //polygon, gray line, red fill
	       [[11,4], [10,3], [8.5,3], [8.5,5], [10,5]]]; //polygon, black line, gray fill

//polygon is 1, line is 2
const kinds = [1, 1, 1, 1, 2, 1, 2, 1, 1];

//black is 1, gray is 2, passed is 3
const line_colors = [1, 1, 1, 1, 1, 3, 1, 2, 1];

//none is 1, black is 2, gray is 3, passed is 4 
const fill_colors = [2, 2, 2, 2, 1, 4, 1, 4, 3];

function rotatePoint(point, center, radians) {

    //const radians = (Math.PI / 180) * angle;
    const rotatedX = Math.cos(radians) * (point.x - center.x) - Math.sin(radians) * (point.y - center.y) + center.x;
    const rotatedY = Math.sin(radians) * (point.x - center.x) + Math.cos(radians) * (point.y - center.y) + center.y;
    
    // Return the rotated point
    return { x: rotatedX-10.5, y: rotatedY-4 };
}

function draw_car(p_ctx, p_x, p_y, p_dir, p_size, p_color){

    paths.forEach( function(path, idx) {
	p_ctx.beginPath();

	if (line_colors[idx] == 1){
	    p_ctx.strokeStyle = "black";
	} else if (line_colors[idx] == 2) {
	    p_ctx.strokeStyle = "gray";
	} else if (line_colors[idx] == 3) {
	    p_ctx.strokeStyle = "#" + p_color;
	}
	
	if (fill_colors[idx] == 2){
	    p_ctx.fillStyle = "black";
	} else if (fill_colors[idx] == 3) {
	    p_ctx.fillStyle = "gray";
	} else if (fill_colors[idx] == 4) {
	    p_ctx.fillStyle = "#" + p_color;
	}
	
	p_ctx.lineWidth = 1;


	starting_point = rotatePoint( {x: path[0][0], y: path[0][1]}, {x:10.5, y:4}, -(p_dir+(3*Math.PI/2)) );
	
	p_ctx.moveTo(p_x+(p_size*starting_point.x), p_y+(p_size*starting_point.y));
	
	path.forEach( function(pt) {
	    rotated_point = rotatePoint( {x: pt[0], y: pt[1]}, {x:10.5, y:4}, -(p_dir+(3*Math.PI/2)) );
	    p_ctx.lineTo(p_x+(p_size*rotated_point.x), p_y+(p_size*rotated_point.y));
	} );
	
	p_ctx.stroke();
	if (fill_colors[idx] > 1){
	    p_ctx.fill();
	}
    });
}

