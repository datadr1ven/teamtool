import json
import ast
import sys

def print_driver_points(driver_points):
        print('       ', end='')
        for raceid in range(24):
           print(' %s' % jd['races'][raceid]['countryCode'], end='')
        print('')
        for key in driver_points.keys():
            print(key,end='')
            for raceid in range(24):
                if '%s' % (raceid+1) in driver_points[key]:
                   print('%4d' % driver_points[key]['%s' % (raceid+1)], end='')
                else:
                   print('    ', end='')
            print('')


def print_driver_prices(driver_prices):
        print('       ', end='')
        for raceid in range(24):
           print('  %s' % jd['races'][raceid]['countryCode'], end='')
        print('')
        for key in driver_prices.keys():
           print(key,end='')
           for raceid in range(24):
               if '%s' % (raceid+1) in driver_prices[key]:
                  number = driver_prices[key]['%s' % (raceid+1)]
                  print(f'{number: >5.1f}', end='')
               else:
                  print('     ', end='')
           print('')

def print_constructor_points(constructor_points):
        print('   ', end='')
        for raceid in range(24):
           print(' %s' % jd['races'][raceid]['countryCode'], end='')
        print('')
        for key in constructor_points.keys():
           print(key,end='')
           for raceid in range(24):
               if '%s' % (raceid+1) in constructor_points[key]:
                  print('%4d' % constructor_points[key]['%s' % (raceid+1)], end='')
               else:
                  print('    ', end='')
           print('')

def print_constructor_prices(constructor_prices):
        print('   ', end='')
        for raceid in range(24):
           print('  %s' % jd['races'][raceid]['countryCode'], end='')
        print('')
        for key in constructor_prices.keys():
           print(key,end='')
           for raceid in range(24):
               if '%s' % (raceid+1) in constructor_prices[key]:
                  number = constructor_prices[key]['%s' % (raceid+1)]
                  print(f'{number: >5.1f}', end='')
               else:
                  print('     ', end='')
           print('')

for line in sys.stdin.readlines():
        cnt = 1
        idx = line.index('seasonResult') - 2
        while cnt > 0:
            if line[idx] == "{":
                cnt += 1
            elif line[idx] == "}":
                cnt -= 1
            idx += 1
        seasonresult = line[line.index('seasonResult') - 3:idx]
        jd = json.loads(seasonresult.encode('raw_unicode_escape').decode('unicode_escape'))


        latest_race = None
        race_abbrvs = []
        for race in jd['seasonResult']['raceResults'].keys():
            if jd['seasonResult']['raceResults'][race]['drivers']:
               latest_race = jd['races'][int(race)-1]['name']
               race_abbrvs.extend([jd['races'][int(race)-1]['countryCode']])

        #DRIVER POINTS AND PRICES
        driver_points = {}
        driver_prices = {}
        for race in jd['seasonResult']['raceResults'].keys():
            if jd['seasonResult']['raceResults'][race]['drivers']:
                for driver in jd['seasonResult']['raceResults'][race]['drivers']:
                      if driver['isActive']:
                          if driver['id'] not in driver_points:
                              driver_points[driver['id']] = {}
                          driver_points[driver['id']][race] = driver['totalPoints']
                          if driver['id'] not in driver_prices:
                              driver_prices[driver['id']] = {}
                          driver_prices[driver['id']][race] = driver['price']

        #constructor POINTS AND PRICES
        constructor_points = {}
        constructor_prices = {}
        for race in jd['seasonResult']['raceResults'].keys():
            if jd['seasonResult']['raceResults'][race]['constructors']:
                for constructor in jd['seasonResult']['raceResults'][race]['constructors']:
                      if constructor['isActive']:
                          if constructor['id'] not in constructor_points:
                              constructor_points[constructor['id']] = {}
                          constructor_points[constructor['id']][race] = constructor['totalPoints']
                          if constructor['id'] not in constructor_prices:
                              constructor_prices[constructor['id']] = {}
                          constructor_prices[constructor['id']][race] = constructor['price']



        print('export const active_season = %d' % jd['activeSeason'])
        print('export const latest_race = \"%s\";' % latest_race)
        print('export const race_names = %s;' % race_abbrvs)

        e_d_po = {}
        e_d_pr = {}
        for (k,v) in driver_points.items():
            if len(v) == len(race_abbrvs):
                e_d_po[k[-3:]] = list(map(lambda x: v['%d' % (x+1)], range(len(v))))
                e_d_pr[k[-3:]] = list(map(lambda x: driver_prices[k]['%d' % (x+1)], range(len(v))))
            else:
                if '%s' % len(race_abbrvs) in v:
                  for (kk,vv) in driver_points.items():
                      if (not k == kk) and (k[:3] == kk[:3]) and (len(vv) < len(race_abbrvs)):
                          e_d_po[k[-3:]] = []
                          e_d_pr[k[-3:]] = []
                          for i in range(len(race_abbrvs)):
                              if '%s' % (i+1) in v:
                                  e_d_po[k[-3:]].extend([v['%d' % (i+1)]])
                                  e_d_pr[k[-3:]].extend([driver_prices[k]['%d' % (i+1)]])
                              else:
                                  e_d_po[k[-3:]].extend([vv['%d' % (i+1)]])
                                  e_d_pr[k[-3:]].extend([driver_prices[kk]['%d' % (i+1)]])
        print('export const driver_points = %s;' % e_d_po)
        print('export const driver_prices = %s;' % e_d_pr)

        e_c_po = {}
        e_c_pr = {}
        for (k,v) in constructor_points.items():
            e_c_po[k] = list(map(lambda x: v['%d' % (x+1)], range(len(v))))
            e_c_pr[k] = list(map(lambda x: constructor_prices[k]['%d' % (x+1)], range(len(v))))
        print('export const team_points = %s;' % e_c_po)
        print('export const team_prices = %s;' % e_c_pr)


