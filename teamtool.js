import GLPK from 'https://cdn.jsdelivr.net/npm/glpk.js@4.0.2/dist/index.js';

const glpk = await GLPK();

const race_names = ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'USA', 'ITA', 'MCO', 'CAN', 'ESP', 'AUT', 'GBR', 'HUN', 'BEL', 'NLD', 'ITA', 'AZE', 'SGP', 'USA', 'MEX', 'BRA', 'USA', 'QAT', 'ARE'];

const driver_points = {'SAI': [47, 42, 18, -4, 19, 20, 15, 17, 28, 28, 16, -16, 23, 17, 26, 30, 28, 46, 26, 36], 'LEC': [35, 55, 21, 28, 46, 26, 22, 20, 2, 16, 18, -16, 45, 24, 33, 34, 31, 38, 37, 22], 'NOR': [29, 30, 35, 38, 36, 56, 17, 28, 26, 13, 51, 40, 19, 37, 25, 36, 19, 23, 8, 16], 'PIA': [27, 30, 26, 47, 29, 20, 30, 46, 23, 42, 15, 17, 27, 24, 22, 12, 10, 21, 23, 10], 'HAM': [24, -10, 17, 26, 18, 21, 46, 26, 47, 23, 29, 32, 20, 16, 20, 30, 5, -19, 6, 12], 'VER': [21, 38, 28, 18, 15, 28, 35, 17, 29, 25, 38, 37, 13, 35, 40, 58, 47, -10, 36, 45], 'RUS': [20, 38, 19, 26, 21, 13, -21, 27, -9, 43, 27, 27, 16, 23, 10, 27, 13, -3, 15, 20], 'MAG': [15, 9, -1, 7, 9, 7, 6, 7, 11, 16, 4, 14, -33, 13, 1, 17, 9, 8, 7, 7], 'STR': [12, 4, 4, -3, 4, 1, 7, 9, 12, 16, 6, 14, 2, 12, -19, 9, 13, 16, -17, 8], 'PER': [11, 19, 9, -2, 15, 14, 19, 20, 6, 18, 19, -17, -20, 11, 30, 40, 33, 22, 31, 31], 'OCO': [11, 10, 6, 7, 4, 3, 10, 7, 6, 4, 4, 16, -19, 1, 11, 12, 5, 0, 8, 7], 'HUL': [10, 11, 6, 6, -3, 6, 2, 0, 14, 20, 6, 19, -32, 3, 13, 4, 10, 11, 9, -3], 'COL': [9, 9, 6, 9, 11, 0, 2, 1, 4, 0, 1, -19, 1, -2, -7, 8, 9, 0, 7, 3], 'ZHO': [8, 6, 6, 7, 4, -2, -18, 0, -2, 2, 4, 6, 2, 5, 20, 13, -17, 4, -2, 11], 'GAS': [6, -1, 4, -4, 1, 9, 3, -19, -20, 12, 7, 14, 2, 1, 15, 13, 5, 5, -20, 6], 'LAW': [5, 20, 23, 2, 1, 5, 8, 1, 6, 10, 7, 9, 0, -2, 16, -9, -19, 8, 0, 5], 'BOT': [3, 1, 3, 1, 6, 1, 3, 1, 4, 8, 1, 8, 8, -2, 10, -14, 8, 2, -1, 0], 'ALB': [0, 11, -16, 12, 6, -2, 2, 5, 6, 12, 4, -12, 5, -20, 10, 11, -20, 4, 6, 0], 'TSU': [-10, 2, 4, -19, -17, -3, 6, 4, 7, 10, 4, 0, 7, 4, 23, -6, 10, 11, -1, -1], 'ALO': [-18, -4, 9, 14, 6, 6, 9, 4, 9, 10, 1, 14, 5, 2, 9, 15, 14, 9, 16, 7]};

const team_points = {'FER': [82, 97, 49, 34, 65, 59, 47, 47, 35, 69, 44, -16, 68, 51, 79, 74, 59, 92, 58, 73], 'MCL': [74, 80, 81, 85, 83, 81, 67, 74, 59, 55, 66, 57, 56, 64, 50, 48, 39, 54, 41, 36], 'MER': [54, 33, 49, 65, 49, 39, 25, 58, 38, 76, 66, 74, 46, 54, 40, 62, 28, -17, 36, 42], 'RED': [42, 72, 47, 26, 40, 52, 69, 47, 55, 56, 82, 25, 8, 61, 85, 126, 108, 32, 90, 89], 'HAA': [35, 25, 10, 16, 11, 16, 7, 10, 30, 41, 11, 34, -65, 21, 19, 26, 20, 20, 19, 9], 'ALP': [22, 14, 11, 2, 18, 17, 18, -10, -12, 21, 24, 31, -12, 5, 29, 28, 11, 6, -13, 12], 'WIL': [14, 19, -7, 31, 22, -2, 5, 9, 15, 11, 4, -26, 11, -21, 4, 20, -10, 5, 14, 4], 'KCK': [12, 6, 8, 17, 9, -2, -14, 2, 3, 9, 8, 13, 12, 2, 29, 4, -8, 7, -4, 10], 'VRB': [-2, 28, 22, -14, -15, 15, 18, 25, 16, 23, 10, 19, 12, 12, 44, -14, -4, 24, 4, 7], 'AST': [-3, 5, 18, 16, 11, 17, 21, 23, 31, 27, 10, 38, 15, 15, -7, 29, 32, 35, 9, 20]};

const driver_prices = {'VER': [31.8, 31.7, 31.6, 31.5, 31.4, 31.4, 31.3, 31.1, 31, 30.9, 30.8, 30.7, 30.5, 30.4, 30.2, 30.1, 29.9, 29.7, 30.4, 30.2, 30], 'NOR': [27.2, 27.1, 27, 26.8, 26.6, 26.5, 26.3, 26.2, 26.1, 26, 26, 25.8, 25.6, 25.4, 24.4, 24.1, 23.8, 23.5, 23.2, 23.1, 23], 'LEC': [25.6, 25.5, 25.3, 25.2, 24.9, 23.9, 23.6, 23.3, 23, 23.3, 23.2, 23.1, 23.6, 22.6, 22.3, 22, 21.7, 21.4, 20.4, 19.4, 19.1], 'PIA': [25.5, 25.4, 25.3, 25.2, 24.2, 23.9, 23.6, 23.3, 22.3, 22, 21.7, 21.6, 21.3, 20.3, 20, 19.9, 19.8, 19.7, 19.4, 19.1, 19], 'HAM': [24.7, 24.4, 25.1, 24.8, 24.5, 24.4, 24.1, 23.1, 22.8, 21.8, 21.7, 21.4, 20.4, 19.4, 19.1, 19, 18.7, 19, 19.5, 19.4, 19.3], 'SAI': [24.3, 23.3, 23, 22.7, 23.2, 22.9, 22.6, 22.5, 22.2, 21.9, 21.6, 21.5, 22, 21, 20.7, 20.4, 20.1, 19.8, 18.8, 18.8, 18.5], 'PER': [23.3, 23.2, 23.1, 23, 23.5, 23.4, 23.3, 23, 22.7, 22.6, 22.5, 22.4, 22.9, 23.4, 23.3, 23, 22.7, 22.4, 22.1, 21.1, 20.8], 'RUS': [22.3, 22, 21.7, 21.4, 21.1, 20.8, 20.7, 21.2, 20.9, 21.4, 21.1, 20.8, 20.5, 19.5, 19.2, 19.1, 18.8, 18.7, 19.2, 19.1, 18.8], 'ALO': [15.4, 15.9, 16.4, 16.3, 16.2, 16.5, 16.4, 16.3, 16.6, 16.5, 16.4, 16.7, 16.4, 16.3, 16.6, 16.5, 16.4, 16.3, 16.2, 15.9, 15.8], 'STR': [14.8, 14.3, 14.4, 14.5, 14.7, 15, 15.3, 15.2, 15.1, 14.6, 14.1, 14.2, 13.2, 13.3, 12.8, 13, 12.5, 12, 11, 11.2, 10.7], 'MAG': [13.4, 12.9, 12.4, 12.6, 12.8, 12.3, 11.8, 11.3, 10.8, 10.3, 9.8, 9.9, 8.9, 9.1, 8.6, 8.7, 8.2, 7.7, 7.2, 6.7, 6.2], 'OCO': [13.3, 12.8, 12.3, 11.8, 11.3, 11.4, 11.5, 11, 10.5, 10, 10.1, 10.2, 9.2, 9.4, 9.5, 9, 8.5, 8.6, 8.8, 8.3, 7.8], 'HUL': [11.7, 11.2, 10.7, 10.2, 9.7, 9.9, 9.4, 9.5, 9.7, 9.2, 8.7, 8.8, 7.8, 8, 8.1, 7.6, 7.7, 7.2, 6.7, 6.2, 6.4], 'LAW': [10.6, 10.7, 10.2, 11, 11.1, 11.2, 11.3, 10.8, 10.9, 10.4, 9.9, 9.4, 8.9, 9.1, 9.3, 8.8, 9, 9.2, 8.7, 8.9, 9], 'TSU': [9.9, 10.1, 10.2, 10.3, 10.5, 10.7, 10.9, 10.4, 10.5, 10, 9.5, 9.6, 9.8, 9.3, 9.4, 8.4, 8.6, 8.1, 7.6, 7.8, 8], 'GAS': [9.4, 9.5, 9.7, 9.8, 10, 10.1, 9.6, 9.7, 9.9, 10.1, 9.6, 9.1, 8.1, 8.2, 8.3, 7.8, 7.3, 7.4, 7.5, 7.7, 7.8], 'ALB': [9.1, 9.3, 8.8, 9, 8.5, 8.6, 8.8, 8.9, 9, 8.5, 8, 8.1, 8.3, 7.8, 8, 7.5, 7, 7.2, 7.3, 6.8, 7], 'ZHO': [8.2, 7.7, 7.8, 7.3, 6.8, 6.9, 7.1, 7.3, 7.5, 7.7, 7.8, 7.9, 7.4, 7.5, 7.6, 7.1, 6.6, 6.8, 6.9, 7.1, 6.6], 'BOT': [6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 7.5, 6.5, 6.7, 6.2, 6.4, 5.9, 6, 6.2, 6.4], 'COL': [7.3, 6.8, 6.3, 5.8, 5.3, 4.8, 5, 5.1, 5.2, 5.3, 5.5, 5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 5.9, 5.9, 5.4, 5.5]};

const team_prices = {'RED': [29.4, 29.4, 29.3, 29.2, 29.2, 29.2, 29.1, 29, 29, 28.9, 28.9, 28.8, 28.8, 28.8, 28.7, 28.6, 28.4, 28.2, 28.2, 28, 27.9], 'MCL': [26.7, 26.6, 26.5, 26.4, 26.2, 26.1, 26, 25.9, 25.8, 25.7, 25.7, 25.6, 25.5, 24.5, 24.2, 24.1, 24, 23.9, 23.6, 23.3, 23.2], 'FER': [25.1, 25, 24.7, 24.4, 24.3, 24, 23.7, 23.4, 23.1, 23, 22.7, 22.6, 23.1, 22.1, 21.8, 21.5, 21.2, 20.9, 19.9, 19.6, 19.3], 'MER': [24.4, 24.1, 24, 23.7, 23.4, 23.1, 23, 22.9, 22.6, 22.5, 22.2, 21.9, 21.6, 20.6, 20.3, 20.2, 19.9, 19.8, 20.3, 20.2, 20.1], 'AST': [14.8, 15.3, 15.6, 15.5, 15.4, 15.7, 15.6, 15.5, 15.4, 15.3, 15.2, 15.5, 15.2, 15.1, 14.6, 15.1, 15, 14.5, 14, 14.1, 13.6], 'VRB': [12.6, 12.8, 12.3, 11.8, 12, 12.2, 11.7, 11.2, 10.7, 10.2, 9.7, 9.8, 9.3, 8.8, 8.9, 8.4, 8.6, 8.8, 8.3, 8.4, 8.5], 'HAA': [12, 11.5, 11, 11.1, 10.6, 10.7, 10.2, 10.3, 10.4, 9.9, 9.4, 9.5, 9, 9.2, 8.7, 8.2, 7.7, 7.2, 6.7, 6.2, 6.3], 'ALP': [11.4, 10.9, 11, 11.1, 11.2, 10.7, 10.2, 9.7, 9.9, 10.1, 9.6, 9.1, 8.6, 8.8, 8.9, 8.4, 7.9, 8, 8.1, 8.3, 8.4], 'WIL': [6.8, 6.9, 7, 7.2, 6.7, 6.2, 6.4, 6.5, 6.6, 6.1, 6.2, 6.3, 6.5, 6, 6.2, 6.3, 6.4, 6.6, 6.7, 6.2, 6.3], 'KCK': [6.6, 6.7, 6.8, 6.9, 6.4, 6.5, 6.7, 6.9, 7, 7.1, 7.2, 7.3, 6.8, 6.3, 6.4, 5.9, 6, 6.2, 6.3, 6.5, 6.6]};

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
    for (const points of value.slice().reverse()){
	thetable += '<td id="' + key + (value.length - idx) + '" style="background-color: white"><sup>' + points + '</sup>&frasl;<sub>$' + driver_prices[key].slice().reverse()[idx] + 'M</sub></td>';
	idx += 1;
    }
    thetable += '</tr>'
}

for (const [key, value] of Object.entries(team_points)){
    thetable += '<tr>';
    thetable += '<th>' + key + '</th>';
    idx = 0;
    for (const points of value.slice().reverse()){
	thetable += '<td id="' + key + (value.length - idx) + '" style="background-color: white"><sup>' + points + '</sup>&frasl;<sub>$' + team_prices[key].slice().reverse()[idx] + 'M</sub></td>';
	idx += 1;
    }
    thetable += '</tr>'
    
}

const num_races = Object.keys(driver_points).length + 1;

idx = 0;
thetable += '<tr><th>Tot</th>';
for (const venue of race_names){
    thetable += '<th id="Tot' + (num_races - idx - 1) + '"></th>';
    idx += 1
}
thetable += '</tr>';
    

window.document.getElementById('thetable').innerHTML = thetable;

for(let window_size = 1; window_size <= Object.keys(driver_points).length; window_size += 1){
    
    const lp_objective_vars = [];
    for (const [key, value] of Object.entries(driver_points)){
	lp_objective_vars.push({name:key, coef:value.slice(0,window_size).reduce((a,b) => a+b) });
    }	    
    for (const [key, value] of Object.entries(team_points)){
	lp_objective_vars.push({name:key, coef:value.slice(0,window_size).reduce((a,b) => a+b) });
    }
    
    const lp_subjectto_vars = [];
    for (const [key, value] of Object.entries(driver_prices)){
	lp_subjectto_vars.push({name:key, coef:value[window_size] });
    }
    for (const [key, value] of Object.entries(team_prices)){
	lp_subjectto_vars.push({name:key, coef:value[window_size] });
    }
    
    const cons2_vars = [];
    for (const [key, value] of Object.entries(driver_points)){
	cons2_vars.push({name:key, coef:1.0 });
    }
    
    const cons3_vars = [];
    for (const [key, value] of Object.entries(team_points)){
	cons3_vars.push({name:key, coef:1.0 });
    }
    
    const subject_to_clause = [];
    subject_to_clause.push( {name:'cons1', vars:lp_subjectto_vars, bnds: { type: glpk.GLP_UP, ub: 100.0, lb: 0.0 }} );
    subject_to_clause.push( {name:'cons2', vars: cons2_vars, bnds: { type: glpk.GLP_FX, ub: 5.0, lb: 5.0 }} );
    subject_to_clause.push( {name:'cons3', vars: cons3_vars, bnds: { type: glpk.GLP_FX, ub: 2.0, lb: 2.0 }} );
    var idx = 4;
    for (const [key, value] of Object.entries(driver_points)){
	subject_to_clause.push( {name: 'cons' + idx, vars: [{ name: key, coef: 1.0 }], bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }} );
	idx += 1;
    }
    for (const [key, value] of Object.entries(team_points)){
	subject_to_clause.push( {name: 'cons' + idx, vars: [{ name: key, coef: 1.0 }], bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }} );
	idx += 1;
    }
    
    const lp = {
	name: 'LP',
	objective: {
            direction: glpk.GLP_MAX,
            name: 'obj',
            vars: lp_objective_vars,
	},
	subjectTo: subject_to_clause,
    };
    
    const opt = {
	msglev: glpk.GLP_MSG_OFF
    };
    
    lp.generals = []
    for (const [key, value] of Object.entries(driver_points)){
	lp.generals.push(key)
    }
    for (const [key, value] of Object.entries(team_points)){
	lp.generals.push(key)
    }
    
    var results = Array(20);
    
    var maxval = -1;
    var max_2xs = []
    var max_results = [];
    for(let idx = 0; idx < 20; idx += 1){
	lp.objective.vars[idx].coef *= 2;
	var result = await glpk.solve(lp, opt);
	
	if (result.result.z >= maxval) {
	    if (result.result.z > maxval) {
		maxval = result.result.z
		max_results = [result]
		max_2xs = [lp.objective.vars[idx].name]
	    } else {
		max_results = max_results + [result]
		max_2xs = max_2xs + [lp.objective.vars[idx].name]
	    }
	}
	
	lp.objective.vars[idx].coef /= 2;
    }
    
    if(max_results.length == 1){
	var cum_price = 0.0;
	const drivers = Object.keys(driver_points).filter((k) => max_results[0].result.vars[k] == 1);
	const teams = Object.keys(team_points).filter((k) => max_results[0].result.vars[k] == 1);
	for (const driver of drivers){
	    window.document.getElementById(driver+window_size).style = "background-color: green";
	    cum_price += driver_prices[driver][window_size];
	}
	for (const team of teams){
	    window.document.getElementById(team+window_size).style = "background-color: green";
	    cum_price += team_prices[team][window_size];
	}
	window.document.getElementById(max_2xs[0]+window_size).style = "background-color: blue";

	window.document.getElementById('Tot' + window_size).innerHTML = '<sup>' + max_results[0].result.z + '</sup>&frasl;<sub>$' + cum_price.toFixed(2) + 'M</sub>';

	
    } else {
	console.log("multiple optimals, need to implement");
    }
    
}
