

# Flow for application
  # Initialize with number of observations, p (original), p (variation 1)
  # Return data and plot


# This application allows users to input parameters for an AB test and simulate the results
  - The app sets up a Flask Backend to serve data to a Javascript/HTML/D3 Frontend
  - I'm working on Dockerizing the backend, so we can deploy to AWS


# To run locally
  - cd to the root directory "visualize-crime-app"
  - export FLASK_APP=app.py
  - flask run
  - You should be able to go to the web address in the Flask prompt and see that the service is working
  - Open the index.html file in your browser (I use Chrome ie. file:///Users/andrewlai/Analysis/continuous-ab-testing/static/index.html)

# App endpoints
  - update_simulation
      This endpoint takes POSTED json and simulates the results

      Ex. 0.0.0.0:5000/update_simulation

      This command will simulate and return data



# To do:
  - Improve "look" of the page
  - Add basic authorization? https://flask-basicauth.readthedocs.io/en/latest/

# Update
  - Web address here!
  -
    $ cd /continuous-ab-testing
    $ eb init -p docker continuous-ab-testing
    $ eb create continuous-ab-testing
    $ eb open
    To deploy updates to your applications, use ‘eb deploy’.

    --LOCAL TESTING--
    eb local run --port 5000
    eb local open

    --ADDITIONAL COMMANDS--
    eb tags continuous-ab-testing -l
