Clone the repository using command: 
git clone https://github.com/AliulisMartynas/vilantis-backend.git

Move to project directory: 
cd vilantis-backend

Create a virtual environment:\
-If you are on Windows\
virtualenv env\
-If you are on Linux or Mac\
python -m venv env

Activate the virtual environment:\
-If you are on Windows\
.\env\Scripts\activate\
-If you are on Linux or Mac\
source env/bin/activate

Install the requirements: pip install -r requirements.txt

Run the app with command:
python manage.py runserver

The development server will be started at http://127.0.0.1:8000/

Main page: http://127.0.0.1:8000/#/
Admin page: http://127.0.0.1:8000/#/administrator

Shortening logic:

The short urls suffix is generated using random library, creating a 5 character long string of either numbers, lowercase letters and uppercase letters and added to http://127.0.0.1:8000/shrt/

Tasks completed:

Required requirements:\
Did all of them except for writing tests

Optional requirements:\
Implemented admin page where it is possible to delete or deactivate shortened urls,\
Limited maximum number of clicks to 5 - after clicks amount reaches 5, the url gets deactivated. In admin interface, pressing activate on a disabled short url with 5 clicks, changes the number of clicks back to 0.
