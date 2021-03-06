from flask import Flask
import csv
import os
from collections import defaultdict
DATA_DIRECTORY = "./data"
app = Flask(__name__)

@app.route('/data')
def read_csv():
    data = dict()
    with open(os.path.join(DATA_DIRECTORY, "jobFeatures.csv"), newline='') as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        headers = []

        for i, row in enumerate(csv_reader):
            if i == 0:
                for column in row:
                    if column == '':
                        data["id"] = []
                        headers.append("id")
                    else:
                        data[column] = []
                        headers.append(column)

            else:
                for i, columnValue in enumerate(row):
                    data[headers[i]].append(columnValue)

    return data                        
                
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
