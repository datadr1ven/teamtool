import GLPK from 'https://cdn.jsdelivr.net/npm/glpk.js@4.0.2/dist/index.js';

function foo(){
	(async () => {

                const glpk = await GLPK();

                function print(res) {
                    const el = window.document.getElementById('output');
                    el.innerHTML = `Solution: LP \n\n ${JSON.stringify(res, null, 2)}`;
                };

		//load driver/team order, points, prices
		//calculate points based on window
		//iterate over 2x choices

                const lp = {
                    name: 'LP',
                    objective: {
                        direction: glpk.GLP_MAX,
                        name: 'obj',
                        vars: [
                            { name: 'VER', coef:36 },
                            { name: 'SAR', coef:7 },
			    { name: 'RIC', coef:0},
			    { name: 'NOR', coef:8},
			    { name: 'GAS', coef:-20 },
			    { name: 'PER', coef:32 },
			    { name: 'ALO', coef:32 },
			    { name: 'LEC', coef:37 },
			    { name: 'STR', coef:-17 },
			    { name: 'MAG', coef:7 },
			    { name: 'TSU', coef:-1 },
			    { name: 'ALB', coef:6 },
			    { name: 'ZHO', coef:-2 },
			    { name: 'HUL', coef:9 },
			    { name: 'OCO', coef:8 },
			    { name: 'HAM', coef:6 },
			    { name: 'SAI', coef:26 },
			    { name: 'RUS', coef:15 },
			    { name: 'BOT', coef:-1 },
			    { name: 'PIA', coef:23 },
			    { name: 'rbr', coef:90 },
			    { name: 'mcl', coef:41 },
			    { name: 'mer', coef:36 },
			    { name: 'fer', coef:58 },
			    { name: 'ast', coef:9 },
			    { name: 'rb', coef:4 },
			    { name: 'alp', coef:-13 },
			    { name: 'kick', coef:-4 },
			    { name: 'haas', coef:19 },
			    { name: 'wil', coef:14 }
                        ]
                    },
                    subjectTo: [
                        {
                        name: 'cons1',
                            vars: [
                            { name: 'VER', coef: 30.4 },
                            { name: 'SAR', coef: 5.9 },
			    { name: 'RIC', coef: 8.7 },
			    { name: 'NOR', coef: 23.2 },
			    { name: 'GAS', coef:7.5 },
			    { name: 'PER', coef:22.1 },
			    { name: 'ALO', coef:16.2 },
			    { name: 'LEC', coef:20.4 },
			    { name: 'STR', coef:11.0 },
			    { name: 'MAG', coef:7.2 },
			    { name: 'TSU', coef:7.6 },
			    { name: 'ALB', coef:7.3 },
			    { name: 'ZHO', coef:6.9 },
			    { name: 'HUL', coef:6.7 },
			    { name: 'OCO', coef:8.8 },
			    { name: 'HAM', coef:19.5 },
			    { name: 'SAI', coef:15.0 },
			    { name: 'RUS', coef:19.2 },
			    { name: 'BOT', coef:6.0 },
			    { name: 'PIA', coef:19.4 },
			    { name: 'rbr', coef:28.2 },
			    { name: 'mcl', coef:23.6 },
			    { name: 'mer', coef:20.3 },
			    { name: 'fer', coef:19.9 },
			    { name: 'ast', coef:14.0 },
			    { name: 'rb', coef:8.3 },
			    { name: 'alp', coef:8.1 },
			    { name: 'kick', coef:6.3 },
			    { name: 'haas', coef:6.7 },
			    { name: 'wil', coef:6.7 }
                            ],
                            bnds: { type: glpk.GLP_UP, ub: 100.0, lb: 0.0 }
                        },
                        {
                            name: 'cons2',
                            vars: [
                            { name: 'VER', coef: 1.0 },
                            { name: 'SAR', coef: 1.0 },
			    { name: 'RIC', coef: 1.0 },
			    { name: 'NOR', coef: 1.0 },
			    { name: 'GAS', coef: 1.0 },
			    { name: 'PER', coef: 1.0 },
			    { name: 'ALO', coef: 1.0 },
			    { name: 'LEC', coef: 1.0 },
			    { name: 'STR', coef: 1.0 },
			    { name: 'MAG', coef: 1.0 },
			    { name: 'TSU', coef: 1.0 },
			    { name: 'ALB', coef: 1.0 },
			    { name: 'ZHO', coef: 1.0 },
			    { name: 'HUL', coef: 1.0 },
			    { name: 'OCO', coef: 1.0 },
			    { name: 'HAM', coef: 1.0 },
			    { name: 'SAI', coef: 1.0 },
			    { name: 'RUS', coef: 1.0 },
			    { name: 'BOT', coef: 1.0 },
			    { name: 'PIA', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_FX, ub: 5.0, lb: 5.0 }
                        },
                        {
                            name: 'cons3',
                            vars: [
			    { name: 'rbr', coef: 1.0 },
			    { name: 'mcl', coef: 1.0 },
			    { name: 'mer', coef: 1.0 },
			    { name: 'fer', coef: 1.0 },
			    { name: 'ast', coef: 1.0 },
			    { name: 'rb', coef: 1.0 },
			    { name: 'alp', coef: 1.0 },
			    { name: 'kick', coef: 1.0 },
			    { name: 'haas', coef: 1.0 },
			    { name: 'wil', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_FX, ub: 2.0, lb: 2.0 }
                        },
                        {
                            name: 'cons4',
                            vars: [
                            { name: 'SAR', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons5',
                            vars: [
                            { name: 'RIC', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons6',
                            vars: [
                            { name: 'NOR', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons7',
                            vars: [
                            { name: 'GAS', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons8',
                            vars: [
                            { name: 'PER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons9',
                            vars: [
                            { name: 'ALO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons10',
                            vars: [
                            { name: 'LEC', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons11',
                            vars: [
                            { name: 'STR', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons12',
                            vars: [
                            { name: 'MAG', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons13',
                            vars: [
                            { name: 'TSU', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons14',
                            vars: [
                            { name: 'ALB', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons15',
                            vars: [
                            { name: 'ZHO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons16',
                            vars: [
                            { name: 'HUL', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons17',
                            vars: [
                            { name: 'OCO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons18',
                            vars: [
                            { name: 'HAM', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons19',
                            vars: [
                            { name: 'SAI', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons20',
                            vars: [
                            { name: 'RUS', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons21',
                            vars: [
                            { name: 'BOT', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons22',
                            vars: [
                            { name: 'PIA', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons23',
                            vars: [
                            { name: 'rbr', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons24',
                            vars: [
                            { name: 'mcl', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons25',
                            vars: [
                            { name: 'mer', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons26',
                            vars: [
                            { name: 'fer', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons27',
                            vars: [
                            { name: 'ast', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons28',
                            vars: [
                            { name: 'rb', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons29',
                            vars: [
                            { name: 'alp', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons30',
                            vars: [
                            { name: 'kick', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons31',
                            vars: [
                            { name: 'haas', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons32',
                            vars: [
                            { name: 'wil', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },
                        {
                            name: 'cons33',
                            vars: [
                            { name: 'VER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        }
                    ]
                };

                const opt = {
                    msglev: glpk.GLP_MSG_OFF
                };
                lp.generals = ['VER', 'SAR', 'RIC', 'NOR', 'GAS', 'PER', 'ALO', 'LEC', 'STR', 'MAG', 'TSU', 'ALB', 'ZHO', 'HUL', 'OCO', 'HAM', 'SAI', 'RUS', 'BOT', 'PIA', 'rbr', 'mcl', 'mer', 'fer', 'ast', 'rb', 'alp', 'kick', 'haas', 'wil'];
                glpk.solve(lp, opt)
                    .then(res => print(res))
                    .catch(err => console.log(err));

                //console.log(await glpk.solve(lp, glpk.GLP_MSG_DBG));

                //window.document.getElementById('cplex').innerHTML = await glpk.write(lp);

            })();
}

const calcbuttonElement = document.getElementById('calcbutton');
calcbuttonElement.addEventListener('click', foo);


