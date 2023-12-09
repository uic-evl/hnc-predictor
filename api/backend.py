from flask import Flask, json, jsonify, request
from flask_cors import CORS, cross_origin
# import pandas as pd
import numpy as np
# import rpy2
import rpy2
import rpy2.robjects as robjects
from rpy2.robjects.packages import SignatureTranslatedAnonymousPackage

from werkzeug.exceptions import BadRequest, InternalServerError

# Start Flask #################################################################
app = Flask(__name__)
CORS(app)

# Error handlers ###############################################################
@app.errorhandler(InternalServerError)
def handle_internal_server_error(error):
    """Handler for cases when the code raised an exception"""
    response = {"description": error.description}
    return jsonify(response), 500


@app.errorhandler(BadRequest)
def handle_bad_request(error):
    """Handler for cases when the parameters are wrong"""
    response = {"description": error.description}
    return jsonify(response), 400


# Routes #######################################################################
@app.route("/backend", methods=['GET', 'POST'])
@cross_origin()
def backend():
    try:        
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
                load(file="Model_OS_cat_nov2021_FINAL.R");
                Overall_survival=predictSurvProb(Model_sel, newdata=dataVal, times=time_years)

                #load(file="C:/Users/lvvan/Google Drive/MDACC/R_dir/scripts_temp/Model_sel_LC3_old_catt_Juli2021.R")
                load(file="Model_LC_cat_nov2021_FINAL.R")
                if (dataVal$T_stage %in% c("T0","T1")){dataVal$T_stage_LC="T0-1"}else{dataVal$T_stage_LC=dataVal$T_stage}
                Local_control=predictSurvProb(Model_sel, newdata=dataVal, times=time_years)


                load(file="Model_RC_nov2021_FINAL.R");
                Regional_control = predictSurvProb(Model_sel, newdata=dataVal, times=time_years)

                stage = as.list(levels(dataVal$stage_new))
                stage_new = as.list(levels(dataVal$stage_new_7th))
                result <- list(Stage_new = stage[dataVal$stage_new], Stage_new_7th = stage[dataVal$stage_new_7th], Overall_survival = Overall_survival, Local_control = Local_control, Regional_control = Regional_control)
                
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
    
    except ValueError as exc:
        err_msg = "Wrong parameters"
        raise BadRequest(err_msg) from exc
    except FileNotFoundError as exc:
        err_msg = "Data not found"
        raise BadRequest(err_msg) from exc
    # pylint: disable=broad-exception-caught
    except Exception as exc:
        raise InternalServerError("internal server error") from exc


if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5000)