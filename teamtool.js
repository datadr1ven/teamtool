import GLPK from 'https://cdn.jsdelivr.net/npm/glpk.js@4.0.2/dist/index.js';

const glpk = await GLPK();

const race_names = ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'USA', 'ITA', 'MCO', 'CAN', 'ESP', 'AUT', 'GBR', 'HUN', 'BEL', 'NLD', 'ITA', 'AZE', 'SGP', 'USA', 'MEX', 'BRA', 'USA', 'QAT', 'ARE'];
const driver_points = {'VER': [45, 36, -10, 47, 58, 40, 35, 13, 37, 38, 25, 29, 17, 35, 28, 15, 18, 28, 38, 21, 77], 'OCO': [7, 8, 0, 5, 12, 11, 1, -19, 16, 4, 4, 6, 7, 10, 3, 4, 7, 6, 10, 10, 36], 'GAS': [6, -20, 5, 5, 13, 15, 1, 2, 14, 7, 12, -20, -19, 3, 9, 1, -4, 4, -1, 6, 30], 'LEC': [22, 37, 38, 31, 34, 33, 24, 45, -16, 18, 16, 2, 20, 22, 26, 46, 28, 21, 55, 35, 26], 'PER': [31, 31, 22, 33, 40, 30, 11, -20, -17, 19, 18, 6, 20, 19, 14, 15, -2, 9, 19, 10, 26], 'RUS': [20, 15, -3, 13, 27, 10, 23, 16, 27, 27, 43, -9, 27, -21, 13, 21, 26, 19, 38, 20, 25], 'NOR': [16, 8, 23, 19, 36, 25, 37, 19, 40, 51, 13, 26, 28, 17, 56, 36, 38, 35, 30, 29, 24], 'TSU': [-1, -1, 11, 10, -6, 23, 4, 7, 0, 4, 10, 7, 4, 6, -3, -17, -19, 4, 2, -20, 17], 'PIA': [10, 23, 21, 10, 12, 22, 24, 27, 17, 15, 42, 23, 46, 30, 20, 29, 47, 26, 30, 26, 16], 'HAM': [12, 6, -19, 5, 30, 20, 16, 20, 32, 29, 23, 47, 26, 46, 21, 18, 26, 17, -10, 24, 15], 'MAG': [7, 7, 8, 9, 17, 1, 13, -33, 14, 4, 16, 11, 7, 6, 7, 9, 7, -1, 9, 15, 14], 'LAW': [5, 0, 8, -19, -9, 16, -2, 0, 9, 7, 10, 6, 1, 8, 5, 1, 2, 23, 20, 4, 9], 'ZHO': [11, -2, 4, -17, 13, 20, 5, 2, 6, 4, 2, -2, 0, -18, -2, 4, 7, 6, 6, 7, 9], 'ALO': [7, 16, 9, 14, 15, 9, 2, 5, 14, 1, 10, 9, 4, 9, 6, 6, 14, 9, -4, -19, 1], 'BOT': [0, -1, 2, 8, -14, 10, -2, 8, 8, 1, 8, 4, 1, 3, 1, 6, 1, 3, 1, 2, -2], 'COL': [3, 7, 0, 9, 8, -7, -2, 1, -19, 1, 0, 4, 1, 2, 0, 11, 9, 6, 9, 8, -10], 'SAI': [36, 26, 46, 28, 30, 26, 17, 23, -16, 16, 28, 28, 17, 15, 20, 19, -4, 18, 42, 47, -12], 'ALB': [0, 6, 4, -20, 11, 10, -20, 5, -12, 4, 12, 6, 5, 2, -2, 6, 12, -16, 11, -18, -15], 'STR': [8, -17, 16, 13, 9, -19, 12, 2, 14, 6, 16, 12, 9, 7, 1, 4, -3, 4, 4, 11, -18], 'HUL': [-3, 9, 11, 10, 4, 13, 3, -32, 19, 6, 20, 14, 0, 2, 6, -3, 6, 6, 11, 9, -42]};
const team_points = {'RED': [89, 90, 32, 108, 126, 85, 61, 8, 25, 82, 56, 55, 47, 69, 52, 40, 26, 47, 72, 41, 96], 'ALP': [12, -13, 6, 11, 28, 29, 5, -12, 31, 24, 21, -12, -10, 18, 17, 18, 2, 11, 14, 21, 71], 'MCL': [36, 41, 54, 39, 48, 50, 64, 56, 57, 66, 55, 59, 74, 67, 81, 83, 85, 81, 80, 73, 50], 'MER': [42, 36, -17, 28, 62, 40, 54, 46, 74, 66, 76, 38, 58, 25, 39, 49, 65, 49, 33, 54, 45], 'VRB': [7, 4, 24, -4, -14, 44, 12, 12, 19, 10, 23, 16, 25, 18, 15, -15, -14, 22, 28, -13, 36], 'FER': [73, 58, 92, 59, 74, 79, 51, 68, -16, 44, 69, 35, 47, 47, 59, 65, 34, 49, 97, 82, 24], 'KCK': [10, -4, 7, -8, 4, 29, 2, 12, 13, 8, 9, 3, 2, -14, -2, 9, 17, 8, 6, 10, 18], 'AST': [20, 9, 35, 32, 29, -7, 15, 15, 38, 10, 27, 31, 23, 21, 17, 11, 16, 18, 5, -5, -4], 'WIL': [4, 14, 5, -10, 20, 4, -21, 11, -26, 4, 11, 15, 9, 5, -2, 22, 31, -7, 19, -5, -20], 'HAA': [9, 19, 20, 20, 26, 19, 21, -65, 34, 11, 41, 30, 10, 7, 16, 11, 16, 10, 25, 34, -29]};
const driver_prices = {'VER': [30, 30.2, 30.4, 29.7, 29.9, 30.1, 30.2, 30.4, 30.5, 30.7, 30.8, 30.9, 31, 31.1, 31.3, 31.4, 31.4, 31.5, 31.6, 31.7, 31.8, 32], 'NOR': [23, 23.1, 23.2, 23.5, 23.8, 24.1, 24.4, 25.4, 25.6, 25.8, 26, 26, 26.1, 26.2, 26.3, 26.5, 26.6, 26.8, 27, 27.1, 27.2, 27.3], 'LEC': [19.1, 19.4, 20.4, 21.4, 21.7, 22, 22.3, 22.6, 23.6, 23.1, 23.2, 23.3, 23, 23.3, 23.6, 23.9, 24.9, 25.2, 25.3, 25.5, 25.7, 25.8], 'PIA': [19, 19.1, 19.4, 19.7, 19.8, 19.9, 20, 20.3, 21.3, 21.6, 21.7, 22, 22.3, 23.3, 23.6, 23.9, 24.2, 25.2, 25.3, 25.4, 25.5, 25.5], 'HAM': [19.3, 19.4, 19.5, 19, 18.7, 19, 19.1, 19.4, 20.4, 21.4, 21.7, 21.8, 22.8, 23.1, 24.1, 24.4, 24.5, 24.8, 25.1, 24.4, 24.7, 24.8], 'SAI': [18.5, 18.8, 18.8, 19.8, 20.1, 20.4, 20.7, 21, 22, 21.5, 21.6, 21.9, 22.2, 22.5, 22.6, 22.9, 23.2, 22.7, 23, 23.3, 24.3, 23.8], 'PER': [20.8, 21.1, 22.1, 22.4, 22.7, 23, 23.3, 23.4, 22.9, 22.4, 22.5, 22.6, 22.7, 23, 23.3, 23.4, 23.5, 23, 23.1, 23.2, 23.3, 23.6], 'RUS': [18.8, 19.1, 19.2, 18.7, 18.8, 19.1, 19.2, 19.5, 20.5, 20.8, 21.1, 21.4, 20.9, 21.2, 20.7, 20.8, 21.1, 21.4, 21.7, 22, 22.3, 22.6], 'ALO': [15.8, 15.9, 16.2, 16.3, 16.4, 16.5, 16.6, 16.3, 16.4, 16.7, 16.4, 16.5, 16.6, 16.3, 16.4, 16.5, 16.2, 16.3, 16.4, 15.9, 15.4, 15.1], 'STR': [10.7, 11.2, 11, 12, 12.5, 13, 12.8, 13.3, 13.2, 14.2, 14.1, 14.6, 15.1, 15.2, 15.3, 15, 14.7, 14.5, 14.4, 14.3, 14.8, 14.6], 'MAG': [6.2, 6.7, 7.2, 7.7, 8.2, 8.7, 8.6, 9.1, 8.9, 9.9, 9.8, 10.3, 10.8, 11.3, 11.8, 12.3, 12.8, 12.6, 12.4, 12.9, 13.4, 13.4], 'OCO': [7.8, 8.3, 8.8, 8.6, 8.5, 9, 9.5, 9.4, 9.2, 10.2, 10.1, 10, 10.5, 11, 11.5, 11.4, 11.3, 11.8, 12.3, 12.8, 13.3, 14.8], 'HUL': [6.4, 6.2, 6.7, 7.2, 7.7, 7.6, 8.1, 8, 7.8, 8.8, 8.7, 9.2, 9.7, 9.5, 9.4, 9.9, 9.7, 10.2, 10.7, 11.2, 11.7, 11.5], 'LAW': [9, 8.9, 8.7, 9.2, 9, 8.8, 9.3, 9.1, 8.9, 9.4, 9.9, 10.4, 10.9, 10.8, 11.3, 11.2, 11.1, 11, 10.2, 10.7, 10.6, 11.1], 'GAS': [7.8, 7.7, 7.5, 7.4, 7.3, 7.8, 8.3, 8.2, 8.1, 9.1, 9.6, 10.1, 9.9, 9.7, 9.6, 10.1, 10, 9.8, 9.7, 9.5, 10, 11], 'TSU': [8, 7.8, 7.6, 8.1, 8.6, 8.4, 9.4, 9.3, 9.8, 9.6, 9.5, 10, 10.5, 10.4, 10.9, 10.7, 10.5, 10.3, 10.2, 10.1, 9.9, 10.9], 'ALB': [7, 6.8, 7.3, 7.2, 7, 7.5, 8, 7.8, 8.3, 8.1, 8, 8.5, 9, 8.9, 8.8, 8.6, 8.5, 9, 8.8, 9.3, 9.1, 8.9], 'ZHO': [6.6, 7.1, 6.9, 6.8, 6.6, 7.1, 7.6, 7.5, 7.4, 7.9, 7.8, 7.7, 7.5, 7.3, 7.1, 6.9, 6.8, 7.3, 7.8, 7.7, 8.2, 8.7], 'COL': [5.5, 5.4, 5.9, 5.9, 6.4, 6.3, 6.1, 5.9, 5.8, 5.6, 5.5, 5.3, 5.2, 5.1, 5, 4.8, 5.3, 5.8, 6.3, 6.8, 7.3, 7.1], 'BOT': [6.4, 6.2, 6, 5.9, 6.4, 6.2, 6.7, 6.5, 7.5, 8, 7.9, 7.8, 7.7, 7.6, 7.5, 7.4, 7.3, 7.2, 7.1, 7, 6.9, 6.7]};
const team_prices = {'RED': [27.9, 28, 28.2, 28.2, 28.4, 28.6, 28.7, 28.8, 28.8, 28.8, 28.9, 28.9, 29, 29, 29.1, 29.2, 29.2, 29.2, 29.3, 29.4, 29.4, 29.6], 'MCL': [23.2, 23.3, 23.6, 23.9, 24, 24.1, 24.2, 24.5, 25.5, 25.6, 25.7, 25.7, 25.8, 25.9, 26, 26.1, 26.2, 26.4, 26.5, 26.6, 26.7, 26.8], 'FER': [19.3, 19.6, 19.9, 20.9, 21.2, 21.5, 21.8, 22.1, 23.1, 22.6, 22.7, 23, 23.1, 23.4, 23.7, 24, 24.3, 24.4, 24.7, 25, 25.1, 25.1], 'MER': [20.1, 20.2, 20.3, 19.8, 19.9, 20.2, 20.3, 20.6, 21.6, 21.9, 22.2, 22.5, 22.6, 22.9, 23, 23.1, 23.4, 23.7, 24, 24.1, 24.4, 24.7], 'AST': [13.6, 14.1, 14, 14.5, 15, 15.1, 14.6, 15.1, 15.2, 15.5, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.4, 15.5, 15.6, 15.3, 14.8, 14.6], 'VRB': [8.5, 8.4, 8.3, 8.8, 8.6, 8.4, 8.9, 8.8, 9.3, 9.8, 9.7, 10.2, 10.7, 11.2, 11.7, 12.2, 12, 11.8, 12.3, 12.8, 12.6, 13.1], 'HAA': [6.3, 6.2, 6.7, 7.2, 7.7, 8.2, 8.7, 9.2, 9, 9.5, 9.4, 9.9, 10.4, 10.3, 10.2, 10.7, 10.6, 11.1, 11, 11.5, 12, 11.8], 'ALP': [8.4, 8.3, 8.1, 8, 7.9, 8.4, 8.9, 8.8, 8.6, 9.1, 9.6, 10.1, 9.9, 9.7, 10.2, 10.7, 11.2, 11.1, 11, 10.9, 11.4, 12.4], 'WIL': [6.3, 6.2, 6.7, 6.6, 6.4, 6.3, 6.2, 6, 6.5, 6.3, 6.2, 6.1, 6.6, 6.5, 6.4, 6.2, 6.7, 7.2, 7, 6.9, 6.7, 6.5], 'KCK': [6.6, 6.5, 6.3, 6.2, 6, 5.9, 6.4, 6.3, 6.8, 7.3, 7.2, 7.1, 7, 6.9, 6.7, 6.5, 6.4, 6.9, 6.8, 6.7, 6.6, 7.1]};
function homogeneous(keyed_lists, descrip){
    var the_length = null;
    var is_homogeneous = true;
    for (const [key, value] of Object.entries(keyed_lists)){
	if (the_length == null){
	    the_length = value.length;
	} else {
	    if (the_length == value.length){
	    } else {
		is_homogeneous = false;
	    }
	}
    }
console.log(descrip + " has homogeneous lengths: " + is_homogeneous + ", with at least one having length: " + the_length);
}

/*
console.log("race_names has length: " + race_names.length);
console.log("driver_points has length: " + Object.keys(driver_points).length);
homogeneous(driver_points, "driver_points");
console.log("team_points has length: " + Object.keys(team_points).length);
homogeneous(team_points, "team_points");
console.log("driver_prices has length: " + Object.keys(driver_prices).length);
homogeneous(driver_prices, "driver_prices");
console.log("team_prices has length: " + Object.keys(team_prices).length);
homogeneous(team_prices, "team_prices");
*/

var thetable = '<tr><th>&nbsp;</th>';
var idx = 0;

for (const venue of race_names){
    thetable += '<th>' + venue + '</th>'
}
thetable += '</tr>';

for (const [key, value] of Object.entries(driver_points)){
    thetable += '<tr>';
    thetable += '<th>' + key + '</th>';
    idx = 0;
    for (const points of value){
	thetable += '<td id="' + key + idx + '" style="background-color: white"><sup>' + points + '</sup>&frasl;<sub>$' + driver_prices[key][idx] + 'M</sub></td>';
	idx += 1;
    }
    thetable += '</tr>'
}

for (const [key, value] of Object.entries(team_points)){
    thetable += '<tr>';
    thetable += '<th>' + key + '</th>';
    idx = 0;
    for (const points of value){
	thetable += '<td id="' + key + idx + '" style="background-color: white"><sup>' + points + '</sup>&frasl;<sub>$' + team_prices[key][idx] + 'M</sub></td>';
	idx += 1;
    }
    thetable += '</tr>'
    
}

const num_races = driver_points[Object.keys(driver_points)[0]].length;

idx = 0;
thetable += '<tr><th>Opt</th>';
for (const venue of race_names){
    thetable += '<th id="Opt' + idx + '"></th>';
    idx += 1
}
thetable += '</tr>';

for (let window = 1; window < num_races; window += 1){
    idx = 0;
    thetable += '<tr><th>' + window + 'Wide</th>';
    for (const venue of race_names){
	thetable += '<th id="' + window + 'Wide' + idx + '"></th>';
	idx += 1
    }
    thetable += '</tr>';
}

window.document.getElementById('thetable').innerHTML = thetable;

//parameters
// start_race
// end_race
// (alt, list of race indices) (ri)
// num drivers (nd)
// num teams (nt)
// price cap (pc)
// chips (limitless, wildcard, final fix, auto pilot, no negative, extra drs)

async function construct_and_solve_linear_program(dpo, tpo, dpr, tpr, ri, pi, nd, nt, pc){

    var rv = Array(2);
    
    const linprog_objective_vars = [];
    for (const [key, value] of Object.entries(dpo)){
	linprog_objective_vars.push({name:key, coef:value.filter((v,i) => ri.includes(i)).reduce((a,b) => a+b) });
    }	    
    for (const [key, value] of Object.entries(tpo)){
	linprog_objective_vars.push({name:key, coef:value.filter((v,i) => ri.includes(i)).reduce((a,b) => a+b) });
    }
    
    const linprog_subjectto_vars = [];
    for (const [key, value] of Object.entries(dpr)){
	linprog_subjectto_vars.push({name:key, coef:value[pi] });
    }
    for (const [key, value] of Object.entries(tpr)){
	linprog_subjectto_vars.push({name:key, coef:value[pi] });
    }
    
    const cons2_vars = [];
    for (const key of Object.keys(dpo)){
	cons2_vars.push({name:key, coef:1.0 });
    }
    
    const cons3_vars = [];
    for (const key of Object.keys(tpo)){
	cons3_vars.push({name:key, coef:1.0 });
    }
    
    const subject_to_clause = [];
    subject_to_clause.push( {name:'cons1', vars:linprog_subjectto_vars, bnds: { type: glpk.GLP_UP, ub: pc, lb: 0.0 }} );
    subject_to_clause.push( {name:'cons2', vars: cons2_vars, bnds: { type: glpk.GLP_FX, ub: nd, lb: nd }} );
    subject_to_clause.push( {name:'cons3', vars: cons3_vars, bnds: { type: glpk.GLP_FX, ub: nt, lb: nt }} );
    var idx = 4;
    for (const key of Object.keys(dpo)){
	subject_to_clause.push( {name: 'cons' + idx, vars: [{ name: key, coef: 1.0 }], bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }} );
	idx += 1;
    }
    for (const key of Object.keys(tpo)){
	subject_to_clause.push( {name: 'cons' + idx, vars: [{ name: key, coef: 1.0 }], bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }} );
	idx += 1;
    }
    
    const linprog = {
	name: 'LP',
	objective: {
            direction: glpk.GLP_MAX,
            name: 'obj',
            vars: linprog_objective_vars,
	},
	subjectTo: subject_to_clause,
    };
    
    linprog.generals = Object.keys(dpo).concat(Object.keys(tpo));

    const opt = {
	msglev: glpk.GLP_MSG_OFF
    };
        
    var num_drivers = Object.keys(dpo).length;
    var results = Array(num_drivers);

    var maxval = -1;
    var m2s = [];
    var mr = [];
    for(let idx = 0; idx < num_drivers; idx += 1){
	linprog.objective.vars[idx].coef *= 2;
	var result = await glpk.solve(linprog, opt);
	
	if (result.result.z >= maxval) {
	    if (result.result.z > maxval) {
		maxval = result.result.z
		mr = [result]
		m2s = [linprog.objective.vars[idx].name]
	    } else {
		mr = mr.concat([result]);
		m2s = m2s.concat([linprog.objective.vars[idx].name]);
	    }
	}
	
	linprog.objective.vars[idx].coef /= 2;
    }

    if(mr.length > 1){
	console.log("WARNING: multiple optimals, need to implement");
	console.log("number of optimals: " + mr.length);
    }
    
    rv[0] = mr;
    rv[1] = m2s;
    return rv;
}

function score_team_from_result(r, the2x, dp, tp, si, ei, pp){

    var rv = 0;
    for (const [key, value] of Object.entries(r.result.vars)){
	if (value == 1){
	    for(let i = si; i < ei; i += 1){
		if( Object.keys(driver_points).includes(key) ){
		    if (key === the2x){
			rv += (2 * driver_points[key][i]);
			if(pp == true){
			    console.log( "2x for " + key + " in race " + i + " is this many points: " + (2 * driver_points[key][i]));
			}
		    } else {
			rv += driver_points[key][i];
			if(pp == true){
			    console.log( "1x for " + key + " in race " + i + " is this many points: " + driver_points[key][i]);
			}
		    }
		}

		if( Object.keys(team_points).includes(key) ){
		    rv += team_points[key][i];
		}
	    }
	}
    }
    return rv;
}

function paint_choices(res, m2, idx, colors, update_cum, price_idx){
    var cum_price = 0.0;
    const drivers = Object.keys(driver_points).filter((k) => res.result.vars[k] == 1);
    const teams = Object.keys(team_points).filter((k) => res.result.vars[k] == 1);
    for (const driver of drivers){
	window.document.getElementById(driver+idx).style = "background-color: " + colors[0];
	cum_price += driver_prices[driver][price_idx];
    }
    for (const team of teams){
	window.document.getElementById(team+idx).style = "background-color: " + colors[1];
	cum_price += team_prices[team][price_idx];
    }
    window.document.getElementById(m2+idx).style = "background-color: " + colors[2];
    if(update_cum){
	window.document.getElementById('Opt' + idx).innerHTML = '<sup>' + res.result.z + '</sup>&frasl;<sub>$' + cum_price.toFixed(2) + 'M</sub>';
    }
}

function colorFromNormalizedValue(value) {
  // Ensure value is within [0, 1] range
  value = Math.max(0, Math.min(1, value));

  // Interpolate between red and green
  const red = Math.round(255 * (1 - value));
  const green = Math.round(255 * value);

  // Create RGB string
  return `rgb(${red}, ${green}, 0)`;
}

function print_choice(res){
    console.log(Object.keys(driver_points).filter((k) => res.result.vars[k] == 1));
    console.log(Object.keys(team_points).filter((k) => res.result.vars[k] == 1));
}

var optimals = Array(num_races);

for(let col = 0; col < num_races; col += 1){
    
    var race_indice = [...Array(num_races).keys()].slice(-(col+1));
    
    const ar = await construct_and_solve_linear_program(driver_points, team_points, driver_prices, team_prices, race_indice, race_indice[0], 5.0, 2.0, 100.0);
    const max_results = ar[0];
    const max_2xs = ar[1];

    //the choice i make at race "num_races - col - 1" to optimize for whole season on
    
    optimals[num_races - col - 1] = max_results[0];

    paint_choices( optimals[num_races - col - 1], max_2xs[0], num_races - col - 1 , ["green", "green", "blue"], true, race_indice[0] )    
}


for (let informed_window = 1; informed_window < num_races; informed_window += 1){
    for (let pick_col = informed_window; pick_col < num_races; pick_col += 1){
	
	var window_pick_indices = [...Array(informed_window).keys()].reverse().map(x => pick_col - x - 1);
	
	const ar = await construct_and_solve_linear_program(driver_points, team_points, driver_prices, team_prices, window_pick_indices, pick_col, 5.0, 2.0, 100.0);
	const max_results = ar[0];
	const max_2xs = ar[1];
	
	const team_score = score_team_from_result(max_results[0], max_2xs[0], driver_points, team_points, pick_col, num_races, false);

	//if (informed_window == 1){
	//    paint_choices( max_results[0], max_2xs[0], pick_col , ["yellow", "yellow", "purple"], false, pick_col);    
	//}
	
	//window.document.getElementById(informed_window + 'Wide' + pick_col).innerHTML = '<sup>' + team_score + '</sup>&frasl;<sub>' + (team_score/optimals[pick_col].result.z).toFixed(2) + '</sub>';
	window.document.getElementById(informed_window + 'Wide' + pick_col).innerHTML = (team_score/optimals[pick_col].result.z).toFixed(2);

	window.document.getElementById(informed_window + 'Wide' + pick_col).style.backgroundColor = colorFromNormalizedValue(team_score/optimals[pick_col].result.z);

    }
}



