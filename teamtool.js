import GLPK from 'https://cdn.jsdelivr.net/npm/glpk.js@4.0.2/dist/index.js';

const glpk = await GLPK();

import {race_names, driver_points, team_points, driver_prices, team_prices} from './race_data.js';

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

function fillSelect(selectId, data, index_label) {
    const selectElement = document.getElementById(selectId);
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    // Add new options
    data.forEach((item, index) => {
	const option = document.createElement('option');
	option.value = index;
	option.text = (index_label ? (index+1) + ". " : "") + item;
	selectElement.appendChild(option);
    });
}

function extract_team(res, two_x){
    let rv = Array(3);
    rv[0] = [two_x];
    rv[1] = Object.keys(driver_points).filter((k) => res.result.vars[k] == 1).filter((kk) => kk != two_x);
    rv[2] = Object.keys(team_points).filter((k) => res.result.vars[k] == 1);
    return rv;
}

async function fillOptimal(first_race, last_race){
    if (last_race > first_race){
	const race_indice = [...Array(last_race-first_race+1).keys()].map(x => x + first_race);
	const ar = await construct_and_solve_linear_program(driver_points, team_points, driver_prices, team_prices, race_indice, race_indice[0], 5.0, 2.0, 100.0);
	const max_results = ar[0];
	const max_2xs = ar[1];
	document.getElementById('intervalperformance').innerHTML = '<p> The optimal team over this race interval is</p><p> ' + format_choice(max_results[0],max_2xs[0]) + '</p><p> for a total of <b>' + max_results[0].result.z + '</b> points<p>';
	
	let et = extract_team(max_results[0],max_2xs[0]);
	
	const price_index = document.getElementById('first_race').selectedIndex;
	
	//2x
	let previously_selected = document.getElementById('2x_driver').selectedIndex;
	fillSelect('2x_driver', Object.keys(driver_points).map(x => x + ' ($' + driver_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('2x_driver').selectedIndex = previously_selected;
	} else {
	    document.getElementById('2x_driver').selectedIndex = Object.keys(driver_points).indexOf(et[0][0]);
	}	
	
	//second_driver
	previously_selected = document.getElementById('second_driver').selectedIndex;
	fillSelect('second_driver', Object.keys(driver_points).map(x => x + ' ($' + driver_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('second_driver').selectedIndex = previously_selected;
	} else {
	    document.getElementById('second_driver').selectedIndex = Object.keys(driver_points).indexOf(et[1][0]);
	}	
	
	//third_driver
	previously_selected = document.getElementById('third_driver').selectedIndex;
	fillSelect('third_driver', Object.keys(driver_points).map(x => x + ' ($' + driver_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('third_driver').selectedIndex = previously_selected;
	} else {
	    document.getElementById('third_driver').selectedIndex = Object.keys(driver_points).indexOf(et[1][1]);
	}	
	
	//fourth_driver
	previously_selected = document.getElementById('fourth_driver').selectedIndex;
	fillSelect('fourth_driver', Object.keys(driver_points).map(x => x + ' ($' + driver_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('fourth_driver').selectedIndex = previously_selected;
	} else {
	    document.getElementById('fourth_driver').selectedIndex = Object.keys(driver_points).indexOf(et[1][2]);
	}	
	
	//fifth_driver
	previously_selected = document.getElementById('fifth_driver').selectedIndex;
	fillSelect('fifth_driver', Object.keys(driver_points).map(x => x + ' ($' + driver_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('fifth_driver').selectedIndex = previously_selected;
	} else {
	    document.getElementById('fifth_driver').selectedIndex = Object.keys(driver_points).indexOf(et[1][3]);
	}	
	
	//first_team
	previously_selected = document.getElementById('first_team').selectedIndex;
	fillSelect('first_team', Object.keys(team_points).map(x => x + ' ($' + team_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('first_team').selectedIndex = previously_selected;
	} else {
	    document.getElementById('first_team').selectedIndex = Object.keys(team_points).indexOf(et[2][0]);
	}	
	
	//second_team
	previously_selected = document.getElementById('second_team').selectedIndex;
	fillSelect('second_team', Object.keys(team_points).map(x => x + ' ($' + team_prices[x][price_index] + 'M)'));
	if (previously_selected > -1){
	    document.getElementById('second_team').selectedIndex = previously_selected;
	} else {
	    document.getElementById('second_team').selectedIndex = Object.keys(team_points).indexOf(et[2][1]);
	}	
	
	
	const a = Object.keys(driver_points)[document.getElementById('2x_driver').selectedIndex];
	const b = Object.keys(driver_points)[document.getElementById('second_driver').selectedIndex];
	const c = Object.keys(driver_points)[document.getElementById('third_driver').selectedIndex];
	const d = Object.keys(driver_points)[document.getElementById('fourth_driver').selectedIndex];
	const e = Object.keys(driver_points)[document.getElementById('fifth_driver').selectedIndex];
	const f = Object.keys(team_points)[document.getElementById('first_team').selectedIndex];
	const g = Object.keys(team_points)[document.getElementById('second_team').selectedIndex];
	const h = document.getElementById('first_race').selectedIndex;
	const i = document.getElementById('last_race').selectedIndex;
	
	const drivers_uniq = [...new Set([a,b,c,d,e])];
	const teams_uniq = [...new Set([f,g])];
	
	let txt = '<p>This team choice ';
	
	if ( drivers_uniq.length == 5 && teams_uniq.length == 2 ){
	    
	    const total_price = driver_prices[a][price_index] + driver_prices[b][price_index] + driver_prices[c][price_index] + driver_prices[d][price_index] + driver_prices[e][price_index]+ team_prices[f][price_index] + team_prices[g][price_index];
	    
	    txt += 'costs <b>$' + total_price.toFixed(2) + 'M</b><p>';
	    
	    if (total_price <= 100.0){
		const team_score = score_team(a,b,c,d,e,f,g,h,i);
		txt += '<p>and scores <b>' + team_score + '</b> points</p>';
		txt += '<p>which is <b>' + ((team_score/max_results[0].result.z) * 100).toFixed(2) + '%</b> of possible points</p>';
	    } else {
		txt += 'and thus <b>exceeds</b> price cap</p>';
	    }
	} else {
	    txt += 'is invalid (duplicate)</p>';
	}
	
	document.getElementById('teamperformance').innerHTML = txt;
	
    }
    
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

var presumptive_number_of_races = driver_points[Object.keys(driver_points)[0]].length;

fillSelect('first_race', race_names.slice(0,presumptive_number_of_races), true);
document.getElementById('first_race').selectedIndex = 0;
fillSelect('last_race', race_names.slice(0,presumptive_number_of_races), true);
document.getElementById('last_race').selectedIndex = presumptive_number_of_races - 1;

document.getElementById('first_race').addEventListener('change', (event) => {
    fillOptimal(event.target.selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('last_race').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, event.target.selectedIndex);
});

document.getElementById('2x_driver').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('second_driver').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('third_driver').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('fourth_driver').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('fifth_driver').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('first_team').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

document.getElementById('second_team').addEventListener('change', (event) => {
    fillOptimal(document.getElementById('first_race').selectedIndex, document.getElementById('last_race').selectedIndex);
});

fillOptimal(0, presumptive_number_of_races - 1);

/*
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
*/
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

function score_team(the2x, second, third, fourth, fifth, teamone, teamtwo, si, ei){
    let rv = 0;
    for (let i = si; i <= ei; i += 1){
	rv += (2 * driver_points[the2x][i]);
	rv += driver_points[second][i];
	rv += driver_points[third][i];
	rv += driver_points[fourth][i];
	rv += driver_points[fifth][i];
	rv += team_points[teamone][i];
	rv += team_points[teamtwo][i];
    }
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

function format_choice(res,two_x){
    return '<b>[' + Object.keys(driver_points).filter((k) => res.result.vars[k] == 1).map(x => x == two_x ? x + '(2x)' : x) + '] / [' + Object.keys(team_points).filter((k) => res.result.vars[k] == 1) + ']</b>';
}

/*
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
*/

