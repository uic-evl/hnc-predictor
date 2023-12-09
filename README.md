# Interface

![Prototype](https://raw.githubusercontent.com/uic-evl/hnc-predictor/master/hnc-predictor-interface.PNG)

# Getting Started With The Frontend

In the project folder run

### `npm install`

then run

### `npm start`

# Backend Configuration

Install R globally
Install R packages - r-prodlim, r-pec

#### python venv

1. Go to api folder
2. Create a virtual environment (if not created already)
   `python -m venv venv`
3. Activate the virtual environment (windows)
   `.\venv\Scripts\activate`
4. Install dependencies from requirements.txt
   `pip install -r requirements.txt`
5. set up flask app
   `set FLASK_APP=backend.py`
6. run flask
   `flask run`

7. if new dependencies are added, update requirements.txt
   `pip freeze > requirements.txt`

# Alternate Python Backend Guide with anaconda

Python version <3.8 for rpy2

Create an ancaonda environment :

### `conda create -n lancet `

Activate the environment:

### `conda activate lancet `

Install necessary packages : c
Install R globally

1. Install Flask -

### `conda install -c anaconda flask`

2. Install Flask_CORS -

### `conda install -c anaconda flask-cors`

3. Install Pandas -

### `conda install -c anaconda pandas`

4. Insall Numpy -

### `conda install -c anaconda numpy`

5. Install rpy2 -

### `conda install -c r rpy2`

6. Install r-prodlim -

### `conda install -c conda-forge r-prodlim`

7. Install r-pec -

### `conda install -c conda-forge r-pec`

Navigate to api folder
then run

### `python backend.py`
