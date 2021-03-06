import sys
import requests
import getopt
import logging
import matplotlib.pyplot as pPlot
from wordcloud import WordCloud, STOPWORDS
import numpy as npy
from PIL import Image
import numpy as np

from bs4 import BeautifulSoup as Soup
sys.path.append("..")
import ChromeDriver

## define globals
JOBLIMIT = 100
job_increment = 0

try:
    opts, args = getopt.getopt(sys.argv[1:], "e:p:", ["email=", "password="])
except getopt.GetoptError as e:
    raise e

for o, a in opts:
    if o in ("-e", "--email"):
        global email
        email = a.strip()
    elif o in ("-p", "--password"):
        global password
        password = a.strip()

logging.basicConfig(filename="indeedDriver.log", filemode="a+", level=logging.INFO, format="%(asctime)s -- %(levelname)s -- %(message)s")        
newDriver = ChromeDriver.ChromeDriver()
# newDriver.loginIndeed(email, password)
jobName = input("Which job are you interested in?").strip()
newDriver.maxWindow()
jobName = "+".join(jobName.split(" "))

jobs = ""

newDriver.driver.get("https://ca.indeed.com/jobs?q=%s&start=%d" % (jobName, job_increment))
boilerplate = input("Configure Your Settings Before You Scrape. Once you have done that, Press ANY KEY to continue.")
while job_increment < 10:

    newDriver.driver.get("https://ca.indeed.com/jobs?q=%s&start=%d" % (jobName, job_increment))
    # page = requests.get(newDriver.getCurrURL())
    # IndeedSoup = Soup(page.content, "html.parser")
    # allJobTitles = IndeedSoup.select(".jobsearch-SerpJobCard")
    jobs += newDriver.indeedGetJobs()
    job_increment += 10
    print(jobs)
    with open("jobs.txt", mode="w+") as f:
        f.write(jobs)

def create_word_cloud(string, picName):
   maskArray = npy.array(Image.open("cloud.jpg"))
   STOPWORDS.update({"management", "knowledge", "environment", "system"})
   cloud = WordCloud(background_color = "black", max_words = 200, mask = maskArray, stopwords=STOPWORDS)
   cloud.generate(string)
   cloud.to_file("%s.jpg" % (picName))

jobs = jobs.lower()
create_word_cloud(jobs, jobName)
newDriver.goodbye()
