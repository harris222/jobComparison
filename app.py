from flask import Flask, request
import csv
import os
from collections import defaultdict
DATA_DIRECTORY = "./theScraper"
app = Flask(__name__)

@app.route('/data', methods=['POST', 'GET'])
def read_csv():
    if request.method == "POST":
        profession = request.data.decode("utf-8")
    else:
        profession = "data analyst"
    with open(os.path.join(DATA_DIRECTORY, "processScraper.csv"), newline='', encoding="utf-8") as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        headers = []
        returnData = []
        rowData = dict()
        rowData["orig_job_title"] = profession

        for i, row in enumerate(csv_reader):    
            rowData = dict()
            if i == 0:
                for column in row:
                    if column == '':
                        headers.append("id")
                    else:
                        headers.append(column)
            else:
                job_title = row[headers.index("job_title")]
                keywords = profession.split()
                not_valid = True
                for keyword in keywords:
                    ## If any keyword in searched profession doesn't match any string in job title
                    ## We don't add the job title in
                    not_valid = True
                    for title in job_title.split():
                        if title == keyword:
                            not_valid = False
                            break
                    
                    ## No match, break
                    if not_valid:
                        break
                    
                
                if not_valid:
                    continue

                
                for i, columnValue in enumerate(row):    
                    rowData[headers[i]] = columnValue
                    
                returnData.append(rowData)

    return {"0" : returnData}  

@app.route("/", methods=["GET"])
def returnAllPossibleTitles():  
    profession = request.data.decode("utf-8")

    with open(os.path.join(DATA_DIRECTORY, "processScraper.csv"), newline='', encoding="utf-8") as csvfile:
        csv_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
        headers = []
        returnData = []

        for i, row in enumerate(csv_reader):    
            if i == 0:
                for column in row:
                    if column == '':
                        headers.append("id")
                    else:
                        headers.append(column)
            else:
                job_title = row[headers.index("job_title")]
                returnData.append(job_title)

    return {"0" : list(set(returnData))}               
                
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
