
### NEED to add D3 next



# Flow for application
  # Initialize with number of observations, p (original), p (variation 1)
  # Return data and plot
  # Asyncrhonoously return data for p-value simulation


# This application allows users to input a CTA station and see crime "hot spots"
  - The app sets up a Flask Backend to serve data to a Javascript/HTML/D3 Frontend
  - I'm working on Dockerizing the backend, so we can deploy to AWS


# To run locally
  - cd to the root directory "visualize-crime-app"
  - export FLASK_APP=app.py
  - flask run
  - You should be able to go to the web address in the Flask prompt and see that the service is working
  - Open the index.html file in your browser (I use Chrome ie. file:///Users/andrewlai/chihacknight/cta-crime/visualize-crime-app/index.html)
  - You may need to move the "data folder" into this working directory (e.g. cta-crima/data copy to visualize-crime-app/data). I needed to do this to get the dockerized version to work.

# App endpoints
  - crimemap
      This endpoint takes an argument, station, and returns data for that station

      Ex. 0.0.0.0:5000/crimemap?station=Howard
      This command will return data from Howard station
          the data will be nx3 shape -- [day, minute, number of crimes]
          day = number of days since the First day in the dataset:: eg. 2001-01-01 is 0..
          minute = minutes after midnight. for example, 1:30 AM is 90
          number of crimes = integer number of crimes that occur on that day/minutes


# To do:
  - Better color scaling
  - Add axes to graphs
  - Improve "look" of the page
  - Currently, data is static. Find a way to continually add data to database each day and query the database
      API connection to Chicago Open Data Portal
      Pull data into S3 bucket? Or do this live?
  - Add basic authorization? https://flask-basicauth.readthedocs.io/en/latest/

# Update 2019-01-21
  - Deployed to cloud!
  - http://crimevisualizer.43cfivjwz2.us-east-1.elasticbeanstalk.com/
  - $ mkdir HelloWorld
    $ cd HelloWorld
    $ eb init -p PHP
    $ echo "Hello World" > index.html
    $ eb create dev-env
    $ eb open
    To deploy updates to your applications, use ‘eb deploy’.
