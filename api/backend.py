from flask import Flask, json, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd
import numpy as np
import rpy2
import rpy2.robjects as robjects
from rpy2.robjects.packages import SignatureTranslatedAnonymousPackage
from rpy2.robjects import pandas2ri


app = Flask(__name__)

CORS(app)

@app.route("/backend", methods=['GET', 'POST'])
@cross_origin()
def backend():
    frontData = request.json
    new_data = frontData['data']
    robjects.r('''
        survivalCalculation <- function(dataVal){
            library(prodlim)
            library(pec)

            source("Stage_maker.R");

            time_years=seq(0,10,0.1) 

            dataVal = stage_maker(dataVal)

            #load(file="C:/Users/lvvan/Google Drive/MDACC/R_dir/scripts_temp/Model_sel_cat_Juli2021.R");
            load(file="Model_sel_cat_Juli2021.R");
            Overall_survival=predictSurvProb(Model_sel, newdata=dataVal, times=time_years)

            #load(file="C:/Users/lvvan/Google Drive/MDACC/R_dir/scripts_temp/Model_sel_LC3_old_catt_Juli2021.R")
            load(file="Model_sel_LC3_old_cat_pool_Juli2021.R")
            Local_control=predictSurvProb(Model_sel, newdata=dataVal, times=time_years)

            result <- list(Overall_survival = Overall_survival, Local_control = Local_control)
            
            result
        
        }    
            
        ''')

    # convert the received data to r dataframe
    df = robjects.DataFrame(new_data)

    # creating the r function into python environment
    survivalCalculationa = robjects.r['survivalCalculation']
    # calling the function
    result = survivalCalculationa(df)
    
    # creating list to save the data
    survival = []

    # saving the data
    for i in range(len(result)):
        array = np.array(result[i])
        survival.append(array.tolist())

    # returning the data to the frontend
    return jsonify(survival)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)