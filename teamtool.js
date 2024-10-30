import GLPK from 'https://cdn.jsdelivr.net/npm/glpk.js@4.0.2/dist/index.js';

function foo(){
        (async () => {

                const glpk = await GLPK();

                function print(res) {
                    const el = window.document.getElementById('output');
                    el.innerHTML = `Solution: LP \n\n ${JSON.stringify(res, null, 2)}`;
                };

                const window_size = window.document.getElementById('window_size').value

                //load driver/team order, points, prices
                //calculate points based on window
                //iterate over 2x choices
                const race_names = ['BHR', 'SAU', 'AUS', 'JPN', 'CHN', 'USA', 'ITA', 'MCO', 'CAN', 'ESP', 'AUT', 'GBR', 'HUN', 'BEL', 'NLD', 'ITA', 'AZE', 'SGP', 'USA', 'MEX', 'BRA', 'USA', 'QAT', 'ARE'];
                const driver_points = {'SAI': [47, 42, 18, -4, 19, 20, 15, 17, 28, 28, 16, -16, 23, 17, 26, 30, 28, 46, 26, 36], 'LEC': [35, 55, 21, 28, 46, 26, 22, 20, 2, 16, 18, -16, 45, 24, 33, 34, 31, 38, 37, 22], 'NOR': [29, 30, 35, 38, 36, 56, 17, 28, 26, 13, 51, 40, 19, 37, 25, 36, 19, 23, 8, 16], 'PIA': [27, 30, 26, 47, 29, 20, 30, 46, 23, 42, 15, 17, 27, 24, 22, 12, 10, 21, 23, 10], 'HAM': [24, -10, 17, 26, 18, 21, 46, 26, 47, 23, 29, 32, 20, 16, 20, 30, 5, -19, 6, 12], 'VER': [21, 38, 28, 18, 15, 28, 35, 17, 29, 25, 38, 37, 13, 35, 40, 58, 47, -10, 36, 45], 'RUS': [20, 38, 19, 26, 21, 13, -21, 27, -9, 43, 27, 27, 16, 23, 10, 27, 13, -3, 15, 20], 'MAG': [15, 9, -1, 7, 9, 7, 6, 7, 11, 16, 4, 14, -33, 13, 1, 17, 9, 8, 7, 7], 'STR': [12, 4, 4, -3, 4, 1, 7, 9, 12, 16, 6, 14, 2, 12, -19, 9, 13, 16, -17, 8], 'PER': [11, 19, 9, -2, 15, 14, 19, 20, 6, 18, 19, -17, -20, 11, 30, 40, 33, 22, 31, 31], 'OCO': [11, 10, 6, 7, 4, 3, 10, 7, 6, 4, 4, 16, -19, 1, 11, 12, 5, 0, 8, 7], 'HUL': [10, 11, 6, 6, -3, 6, 2, 0, 14, 20, 6, 19, -32, 3, 13, 4, 10, 11, 9, -3], 'COL': [9, 9, 6, 9, 11, 0, 2, 1, 4, 0, 1, -19, 1, -2, -7, 8, 9, 0, 7, 3], 'ZHO': [8, 6, 6, 7, 4, -2, -18, 0, -2, 2, 4, 6, 2, 5, 20, 13, -17, 4, -2, 11], 'GAS': [6, -1, 4, -4, 1, 9, 3, -19, -20, 12, 7, 14, 2, 1, 15, 13, 5, 5, -20, 6], 'LAW': [5, 20, 23, 2, 1, 5, 8, 1, 6, 10, 7, 9, 0, -2, 16, -9, -19, 8, 0, 5], 'BOT': [3, 1, 3, 1, 6, 1, 3, 1, 4, 8, 1, 8, 8, -2, 10, -14, 8, 2, -1, 0], 'ALB': [0, 11, -16, 12, 6, -2, 2, 5, 6, 12, 4, -12, 5, -20, 10, 11, -20, 4, 6, 0], 'TSU': [-10, 2, 4, -19, -17, -3, 6, 4, 7, 10, 4, 0, 7, 4, 23, -6, 10, 11, -1, -1], 'ALO': [-18, -4, 9, 14, 6, 6, 9, 4, 9, 10, 1, 14, 5, 2, 9, 15, 14, 9, 16, 7]};
                const team_points = {'FER': [82, 97, 49, 34, 65, 59, 47, 47, 35, 69, 44, -16, 68, 51, 79, 74, 59, 92, 58, 73], 'MCL': [74, 80, 81, 85, 83, 81, 67, 74, 59, 55, 66, 57, 56, 64, 50, 48, 39, 54, 41, 36], 'MER': [54, 33, 49, 65, 49, 39, 25, 58, 38, 76, 66, 74, 46, 54, 40, 62, 28, -17, 36, 42], 'RED': [42, 72, 47, 26, 40, 52, 69, 47, 55, 56, 82, 25, 8, 61, 85, 126, 108, 32, 90, 89], 'HAA': [35, 25, 10, 16, 11, 16, 7, 10, 30, 41, 11, 34, -65, 21, 19, 26, 20, 20, 19, 9], 'ALP': [22, 14, 11, 2, 18, 17, 18, -10, -12, 21, 24, 31, -12, 5, 29, 28, 11, 6, -13, 12], 'WIL': [14, 19, -7, 31, 22, -2, 5, 9, 15, 11, 4, -26, 11, -21, 4, 20, -10, 5, 14, 4], 'KCK': [12, 6, 8, 17, 9, -2, -14, 2, 3, 9, 8, 13, 12, 2, 29, 4, -8, 7, -4, 10], 'VRB': [-2, 28, 22, -14, -15, 15, 18, 25, 16, 23, 10, 19, 12, 12, 44, -14, -4, 24, 4, 7], 'AST': [-3, 5, 18, 16, 11, 17, 21, 23, 31, 27, 10, 38, 15, 15, -7, 29, 32, 35, 9, 20]};
                const driver_prices = {'VER': [31.8, 31.7, 31.6, 31.5, 31.4, 31.4, 31.3, 31.1, 31, 30.9, 30.8, 30.7, 30.5, 30.4, 30.2, 30.1, 29.9, 29.7, 30.4, 30.2, 30], 'NOR': [27.2, 27.1, 27, 26.8, 26.6, 26.5, 26.3, 26.2, 26.1, 26, 26, 25.8, 25.6, 25.4, 24.4, 24.1, 23.8, 23.5, 23.2, 23.1, 23], 'LEC': [25.6, 25.5, 25.3, 25.2, 24.9, 23.9, 23.6, 23.3, 23, 23.3, 23.2, 23.1, 23.6, 22.6, 22.3, 22, 21.7, 21.4, 20.4, 19.4, 19.1], 'PIA': [25.5, 25.4, 25.3, 25.2, 24.2, 23.9, 23.6, 23.3, 22.3, 22, 21.7, 21.6, 21.3, 20.3, 20, 19.9, 19.8, 19.7, 19.4, 19.1, 19], 'HAM': [24.7, 24.4, 25.1, 24.8, 24.5, 24.4, 24.1, 23.1, 22.8, 21.8, 21.7, 21.4, 20.4, 19.4, 19.1, 19, 18.7, 19, 19.5, 19.4, 19.3], 'SAI': [24.3, 23.3, 23, 22.7, 23.2, 22.9, 22.6, 22.5, 22.2, 21.9, 21.6, 21.5, 22, 21, 20.7, 20.4, 20.1, 19.8, 18.8, 18.8, 18.5], 'PER': [23.3, 23.2, 23.1, 23, 23.5, 23.4, 23.3, 23, 22.7, 22.6, 22.5, 22.4, 22.9, 23.4, 23.3, 23, 22.7, 22.4, 22.1, 21.1, 20.8], 'RUS': [22.3, 22, 21.7, 21.4, 21.1, 20.8, 20.7, 21.2, 20.9, 21.4, 21.1, 20.8, 20.5, 19.5, 19.2, 19.1, 18.8, 18.7, 19.2, 19.1, 18.8], 'ALO': [15.4, 15.9, 16.4, 16.3, 16.2, 16.5, 16.4, 16.3, 16.6, 16.5, 16.4, 16.7, 16.4, 16.3, 16.6, 16.5, 16.4, 16.3, 16.2, 15.9, 15.8], 'STR': [14.8, 14.3, 14.4, 14.5, 14.7, 15, 15.3, 15.2, 15.1, 14.6, 14.1, 14.2, 13.2, 13.3, 12.8, 13, 12.5, 12, 11, 11.2, 10.7], 'MAG': [13.4, 12.9, 12.4, 12.6, 12.8, 12.3, 11.8, 11.3, 10.8, 10.3, 9.8, 9.9, 8.9, 9.1, 8.6, 8.7, 8.2, 7.7, 7.2, 6.7, 6.2], 'OCO': [13.3, 12.8, 12.3, 11.8, 11.3, 11.4, 11.5, 11, 10.5, 10, 10.1, 10.2, 9.2, 9.4, 9.5, 9, 8.5, 8.6, 8.8, 8.3, 7.8], 'HUL': [11.7, 11.2, 10.7, 10.2, 9.7, 9.9, 9.4, 9.5, 9.7, 9.2, 8.7, 8.8, 7.8, 8, 8.1, 7.6, 7.7, 7.2, 6.7, 6.2, 6.4], 'LAW': [10.6, 10.7, 10.2, 11, 11.1, 11.2, 11.3, 10.8, 10.9, 10.4, 9.9, 9.4, 8.9, 9.1, 9.3, 8.8, 9, 9.2, 8.7, 8.9, 9], 'TSU': [9.9, 10.1, 10.2, 10.3, 10.5, 10.7, 10.9, 10.4, 10.5, 10, 9.5, 9.6, 9.8, 9.3, 9.4, 8.4, 8.6, 8.1, 7.6, 7.8, 8], 'GAS': [9.4, 9.5, 9.7, 9.8, 10, 10.1, 9.6, 9.7, 9.9, 10.1, 9.6, 9.1, 8.1, 8.2, 8.3, 7.8, 7.3, 7.4, 7.5, 7.7, 7.8], 'ALB': [9.1, 9.3, 8.8, 9, 8.5, 8.6, 8.8, 8.9, 9, 8.5, 8, 8.1, 8.3, 7.8, 8, 7.5, 7, 7.2, 7.3, 6.8, 7], 'ZHO': [8.2, 7.7, 7.8, 7.3, 6.8, 6.9, 7.1, 7.3, 7.5, 7.7, 7.8, 7.9, 7.4, 7.5, 7.6, 7.1, 6.6, 6.8, 6.9, 7.1, 6.6], 'BOT': [6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8, 7.5, 6.5, 6.7, 6.2, 6.4, 5.9, 6, 6.2, 6.4], 'COL': [7.3, 6.8, 6.3, 5.8, 5.3, 4.8, 5, 5.1, 5.2, 5.3, 5.5, 5.6, 5.8, 5.9, 6.1, 6.3, 6.4, 5.9, 5.9, 5.4, 5.5]};
                const team_prices = {'RED': [29.4, 29.4, 29.3, 29.2, 29.2, 29.2, 29.1, 29, 29, 28.9, 28.9, 28.8, 28.8, 28.8, 28.7, 28.6, 28.4, 28.2, 28.2, 28, 27.9], 'MCL': [26.7, 26.6, 26.5, 26.4, 26.2, 26.1, 26, 25.9, 25.8, 25.7, 25.7, 25.6, 25.5, 24.5, 24.2, 24.1, 24, 23.9, 23.6, 23.3, 23.2], 'FER': [25.1, 25, 24.7, 24.4, 24.3, 24, 23.7, 23.4, 23.1, 23, 22.7, 22.6, 23.1, 22.1, 21.8, 21.5, 21.2, 20.9, 19.9, 19.6, 19.3], 'MER': [24.4, 24.1, 24, 23.7, 23.4, 23.1, 23, 22.9, 22.6, 22.5, 22.2, 21.9, 21.6, 20.6, 20.3, 20.2, 19.9, 19.8, 20.3, 20.2, 20.1], 'AST': [14.8, 15.3, 15.6, 15.5, 15.4, 15.7, 15.6, 15.5, 15.4, 15.3, 15.2, 15.5, 15.2, 15.1, 14.6, 15.1, 15, 14.5, 14, 14.1, 13.6], 'VRB': [12.6, 12.8, 12.3, 11.8, 12, 12.2, 11.7, 11.2, 10.7, 10.2, 9.7, 9.8, 9.3, 8.8, 8.9, 8.4, 8.6, 8.8, 8.3, 8.4, 8.5], 'HAA': [12, 11.5, 11, 11.1, 10.6, 10.7, 10.2, 10.3, 10.4, 9.9, 9.4, 9.5, 9, 9.2, 8.7, 8.2, 7.7, 7.2, 6.7, 6.2, 6.3], 'ALP': [11.4, 10.9, 11, 11.1, 11.2, 10.7, 10.2, 9.7, 9.9, 10.1, 9.6, 9.1, 8.6, 8.8, 8.9, 8.4, 7.9, 8, 8.1, 8.3, 8.4], 'WIL': [6.8, 6.9, 7, 7.2, 6.7, 6.2, 6.4, 6.5, 6.6, 6.1, 6.2, 6.3, 6.5, 6, 6.2, 6.3, 6.4, 6.6, 6.7, 6.2, 6.3], 'KCK': [6.6, 6.7, 6.8, 6.9, 6.4, 6.5, 6.7, 6.9, 7, 7.1, 7.2, 7.3, 6.8, 6.3, 6.4, 5.9, 6, 6.2, 6.3, 6.5, 6.6]};

                const lp = {
                    name: 'LP',
                    objective: {
                        direction: glpk.GLP_MAX,
                        name: 'obj',
                        vars: [
                                 { name: 'SAI', coef:driver_points['SAI'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'LEC', coef:driver_points['LEC'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'NOR', coef:driver_points['NOR'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'PIA', coef:driver_points['PIA'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'HAM', coef:driver_points['HAM'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'VER', coef:driver_points['VER'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'RUS', coef:driver_points['RUS'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'MAG', coef:driver_points['MAG'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'STR', coef:driver_points['STR'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'PER', coef:driver_points['PER'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'OCO', coef:driver_points['OCO'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'HUL', coef:driver_points['HUL'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'COL', coef:driver_points['COL'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'ZHO', coef:driver_points['ZHO'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'GAS', coef:driver_points['GAS'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'LAW', coef:driver_points['LAW'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'BOT', coef:driver_points['BOT'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'ALB', coef:driver_points['ALB'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'TSU', coef:driver_points['TSU'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'ALO', coef:driver_points['ALO'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'FER', coef:team_points['FER'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'MCL', coef:team_points['MCL'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'MER', coef:team_points['MER'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'RED', coef:team_points['RED'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'HAA', coef:team_points['HAA'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'ALP', coef:team_points['ALP'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'WIL', coef:team_points['WIL'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'KCK', coef:team_points['KCK'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'VRB', coef:team_points['VRB'].slice(0,window_size).reduce((a,b) => a+b) },
                                 { name: 'AST', coef:team_points['AST'].slice(0,window_size).reduce((a,b) => a+b) },
                    ]
                    },
                    subjectTo: [
                        {
                        name: 'cons1',
                            vars: [
                                 { name: 'SAI', coef:driver_prices['SAI'][0] },
                                 { name: 'LEC', coef:driver_prices['LEC'][0] },
                                 { name: 'NOR', coef:driver_prices['NOR'][0] },
                                 { name: 'PIA', coef:driver_prices['PIA'][0] },
                                 { name: 'HAM', coef:driver_prices['HAM'][0] },
                                 { name: 'VER', coef:driver_prices['VER'][0] },
                                 { name: 'RUS', coef:driver_prices['RUS'][0] },
                                 { name: 'MAG', coef:driver_prices['MAG'][0] },
                                 { name: 'STR', coef:driver_prices['STR'][0] },
                                 { name: 'PER', coef:driver_prices['PER'][0] },
                                 { name: 'OCO', coef:driver_prices['OCO'][0] },
                                 { name: 'HUL', coef:driver_prices['HUL'][0] },
                                 { name: 'COL', coef:driver_prices['COL'][0] },
                                 { name: 'ZHO', coef:driver_prices['ZHO'][0] },
                                 { name: 'GAS', coef:driver_prices['GAS'][0] },
                                 { name: 'LAW', coef:driver_prices['LAW'][0] },
                                 { name: 'BOT', coef:driver_prices['BOT'][0] },
                                 { name: 'ALB', coef:driver_prices['ALB'][0] },
                                 { name: 'TSU', coef:driver_prices['TSU'][0] },
                                 { name: 'ALO', coef:driver_prices['ALO'][0] },
                                 { name: 'FER', coef:team_prices['FER'][0] },
                                 { name: 'MCL', coef:team_prices['MCL'][0] },
                                 { name: 'MER', coef:team_prices['MER'][0] },
                                 { name: 'RED', coef:team_prices['RED'][0] },
                                 { name: 'HAA', coef:team_prices['HAA'][0] },
                                 { name: 'ALP', coef:team_prices['ALP'][0] },
                                 { name: 'WIL', coef:team_prices['WIL'][0] },
                                 { name: 'KCK', coef:team_prices['KCK'][0] },
                                 { name: 'VRB', coef:team_prices['VRB'][0] },
                                 { name: 'AST', coef:team_prices['AST'][0] },

    ],
                            bnds: { type: glpk.GLP_UP, ub: 100.0, lb: 0.0 }
                        },
                        {
                            name: 'cons2',
                            vars: [
                                 { name: 'SAI', coef:1.0 },
                                 { name: 'LEC', coef:1.0 },
                                 { name: 'NOR', coef:1.0 },
                                 { name: 'PIA', coef:1.0 },
                                 { name: 'HAM', coef:1.0 },
                                 { name: 'VER', coef:1.0 },
                                 { name: 'RUS', coef:1.0 },
                                 { name: 'MAG', coef:1.0 },
                                 { name: 'STR', coef:1.0 },
                                 { name: 'PER', coef:1.0 },
                                 { name: 'OCO', coef:1.0 },
                                 { name: 'HUL', coef:1.0 },
                                 { name: 'COL', coef:1.0 },
                                 { name: 'ZHO', coef:1.0 },
                                 { name: 'GAS', coef:1.0 },
                                 { name: 'LAW', coef:1.0 },
                                 { name: 'BOT', coef:1.0 },
                                 { name: 'ALB', coef:1.0 },
                                 { name: 'TSU', coef:1.0 },
                                 { name: 'ALO', coef:1.0 },

                            ],
                            bnds: { type: glpk.GLP_FX, ub: 5.0, lb: 5.0 }
                        },
                        {
                            name: 'cons3',
                            vars: [
                                 { name: 'FER', coef:1.0 },
                                 { name: 'MCL', coef:1.0 },
                                 { name: 'MER', coef:1.0 },
                                 { name: 'RED', coef:1.0 },
                                 { name: 'HAA', coef:1.0 },
                                 { name: 'ALP', coef:1.0 },
                                 { name: 'WIL', coef:1.0 },
                                 { name: 'KCK', coef:1.0 },
                                 { name: 'VRB', coef:1.0 },
                                 { name: 'AST', coef:1.0 },

                            ],
                            bnds: { type: glpk.GLP_FX, ub: 2.0, lb: 2.0 }
                        },

                        {
                            name: 'cons4',
                            vars: [
                            { name: 'SAI', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons5',
                            vars: [
                            { name: 'LEC', coef: 1.0 }
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
                            { name: 'PIA', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons8',
                            vars: [
                            { name: 'HAM', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons9',
                            vars: [
                            { name: 'VER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons10',
                            vars: [
                            { name: 'RUS', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons11',
                            vars: [
                            { name: 'MAG', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons12',
                            vars: [
                            { name: 'STR', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons13',
                            vars: [
                            { name: 'PER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons14',
                            vars: [
                            { name: 'OCO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons15',
                            vars: [
                            { name: 'HUL', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons16',
                            vars: [
                            { name: 'COL', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons17',
                            vars: [
                            { name: 'ZHO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons18',
                            vars: [
                            { name: 'GAS', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons19',
                            vars: [
                            { name: 'LAW', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons20',
                            vars: [
                            { name: 'BOT', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons21',
                            vars: [
                            { name: 'ALB', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons22',
                            vars: [
                            { name: 'TSU', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons23',
                            vars: [
                            { name: 'ALO', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons24',
                            vars: [
                            { name: 'FER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons25',
                            vars: [
                            { name: 'MCL', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons26',
                            vars: [
                            { name: 'MER', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons27',
                            vars: [
                            { name: 'RED', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons28',
                            vars: [
                            { name: 'HAA', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons29',
                            vars: [
                            { name: 'ALP', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons30',
                            vars: [
                            { name: 'WIL', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons31',
                            vars: [
                            { name: 'KCK', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons32',
                            vars: [
                            { name: 'VRB', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                        {
                            name: 'cons33',
                            vars: [
                            { name: 'AST', coef: 1.0 }
                            ],
                            bnds: { type: glpk.GLP_DB, ub: 1.0, lb: 0.0 }
                        },

                    ]
                };

                const opt = {
                    msglev: glpk.GLP_MSG_OFF
                };
                lp.generals = ['SAI', 'LEC', 'NOR', 'PIA', 'HAM', 'VER', 'RUS', 'MAG', 'STR', 'PER', 'OCO', 'HUL', 'COL', 'ZHO', 'GAS', 'LAW', 'BOT', 'ALB', 'TSU', 'ALO', 'FER', 'MCL', 'MER', 'RED', 'HAA', 'ALP', 'WIL', 'KCK', 'VRB', 'AST'];

                console.log(lp.objective.vars[0]);

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
		//console.log(max_results[0]);
		console.log(Object.keys(driver_points).filter((k) => max_results[0].result.vars[k] == 1));
		console.log(Object.keys(team_points).filter((k) => max_results[0].result.vars[k] == 1));
		console.log(max_results[0].result.z + ' is the points');
		console.log(max_2xs[0] + ' is the 2x');
	    } else {
		console.log("todo: handle multiple optimal");
	    }


	    
                //console.log(results);

                //console.log(await glpk.solve(lp, glpk.GLP_MSG_DBG));

                //window.document.getElementById('cplex').innerHTML = await glpk.write(lp);

            })();
}

const calcbuttonElement = document.getElementById('calcbutton');
calcbuttonElement.addEventListener('click', foo);
