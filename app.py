# flask_web/app.py

from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from datetime import datetime
import time
import json
from scipy.stats import binom_test

################################################################
## Flask app
################################################################

def simulate_sequence_of_successes(n_obs, p):
    return np.random.random(n_obs) < p

def base_simulation(n_obs, orgn_p, var1_p):

    n_obs = int(n_obs)
    orgn_p = float(orgn_p)
    var1_p = float(var1_p)

    x = simulate_sequence_of_successes(n_obs, orgn_p)
    y = simulate_sequence_of_successes(n_obs, var1_p)

    # Calculate running statistics
    orgn_pct_success = x.cumsum()/np.arange(1, n_obs+1)
    var1_pct_success = y.cumsum()/np.arange(1, n_obs+1)
    var1_n_success = y.cumsum()

    # Calculate significance
    p = [binom_test(var1_n_success[i], n=i+1, p=orgn_pct_success[i]) for i in range(0,n_obs)]

    df = pd.DataFrame([orgn_pct_success, var1_pct_success, var1_n_success, p]).T.reset_index()
    df.columns = ['observation',
                    'original_pct_success',
                    'variation1_pct_success',
                    'variation1_n_success',
                    'p']

    df['observation'] = df['observation'] + 1

    # import pdb; pdb.set_trace();
    return df

################################################################
## Flask app
################################################################

app = Flask(__name__, static_url_path='/static')


@app.route('/')
def root():
    return app.send_static_file('index.html')


@app.route('/hello_world')
def hello_world():
    return 'Hello world!'


@app.route('/echo_payload', methods=['POST'])
def echo_payload():

    # import pdb; pdb.set_trace();
    data = json.loads(request.get_data())
    print(f'JSON Payload {data}')

    # Return response
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/update_simulation', methods=['POST'])
def update_simulation():

    data = json.loads(request.get_data())
    print(f'JSON Payload {data}')

    df = base_simulation(data['n_observations'],
                            data['p_original'],
                            data['p_variation1'])


    # import pdb; pdb.set_trace();
    # df.to_json(orient='records')
    response = json.loads(df.to_json(orient='records')) #jsonify()
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response #jsonify(data)

@app.route('/echonumber')
def echonumber():
    print('echonumber')
    number = request.args.get('number')
    return number

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)



    # {'original_mean':orgn_pct_success,
    #                     'var1_mean': var1_pct_success,
    #                     'var1_n_success': var1_n_success}
