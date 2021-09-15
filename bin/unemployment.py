#!/usr/bin/env python
#
# ******************************************************************************
#
# al-btn, a React/D3 visualization of Alabama data
#
# Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
#
# All rights reserved.
#
# ******************************************************************************

import re
import datetime
import requests
import json
from decimal import Decimal
from bs4 import BeautifulSoup as bs

with open("public/data/census/alabama-county-fips.json", "r") as f:
    fips = json.load(f)

with open("public/data/alabama/clfbycnty.html", "rb") as f:
    soup = bs(f, "html.parser")

counties_id = "ctl00_ContentPlaceHolder1_GridView4"
current_labor_force_id = "ctl00_ContentPlaceHolder1_GridView1"
previous_month_labor_force_id = "ctl00_ContentPlaceHolder1_GridView28"
previous_year_labor_force_id = "ctl00_ContentPlaceHolder1_GridView3"

current_employed_id = "ctl00_ContentPlaceHolder1_GridView27"
previous_month_employed_id = "ctl00_ContentPlaceHolder1_GridView6"
previous_year_employed_id = "ctl00_ContentPlaceHolder1_GridView7"

current_unemployed_id = "ctl00_ContentPlaceHolder1_GridView8"
previous_month_unemployed_id = "ctl00_ContentPlaceHolder1_GridView9"
previous_year_unemployed_id = "ctl00_ContentPlaceHolder1_GridView10"

current_rate_id = "ctl00_ContentPlaceHolder1_GridView11"
previous_month_rate_id = "ctl00_ContentPlaceHolder1_GridView12"
previous_year_rate_id = "ctl00_ContentPlaceHolder1_GridView13"

months = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12,
}

data = {
    "data": [],
    "fetched": str(datetime.datetime.now()),
}

# Date.
date_re = r"(?i)(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})"
for s in soup.find_all("section", class_="intro-box"):
    for c in s.children:
        date = re.search(date_re, c.text)
        if date:
            data["month"] = months[date.group(1)]
            data["year"] = date.group(2)


def get_counties(id):
    data = []
    table = soup.find(id=id)
    for c in table.children:
        county = re.search(r"([\w\.\s]+)\s+County", c.text.strip())
        if county:
            data.append(county.group(1))

    return data


def get_fips(county):
    for (k, v) in fips["AL"].items():
        if v["county"] == county:
            return k


def get_integers(id):
    data = []
    table = soup.find(id=id)
    for c in table.children:
        total = re.search(r"([\d,]+)", c.text.strip())
        if total:
            data.append(int(total.group(1).replace(",", "")))

    return data


def get_percents(id):
    percents = []
    table = soup.find(id=id)
    for c in table.children:
        total = re.search(r"([\d\.]+)%", c.text.strip())
        if total:
            percents.append(str(Decimal(total.group(1)) / 100))

    return percents


labels = [
    "fips",
    "month",
    "year",
    "current labor force",
    "previous month labor force",
    "previous year labor force",
    "current employed",
    "previous month employed",
    "previous year employed",
    "current unemployed",
    "previous month unemployed",
    "previous year unemployed",
    "current rate",
    "previous month rate",
    "previous year rate",
]

# Rate tolerance.
tol = 0.02

for county in zip(
                [get_fips(c) for c in get_counties(counties_id)],
                [data["month"] - 1 for c in get_counties(counties_id)],
                [data["year"] for c in get_counties(counties_id)],
                get_integers(current_labor_force_id),
                get_integers(previous_month_labor_force_id),
                get_integers(previous_year_labor_force_id),
                get_integers(current_employed_id),
                get_integers(previous_month_employed_id),
                get_integers(previous_year_employed_id),
                get_integers(current_unemployed_id),
                get_integers(previous_month_unemployed_id),
                get_integers(previous_year_unemployed_id),
                get_percents(current_rate_id),
                get_percents(previous_month_rate_id),
                get_percents(previous_year_rate_id),
):
    # Check scraped versus calculated rate.
    assert int(county[9]) / int(county[3]) <= (1 + tol) * float(county[12])
    assert int(county[9]) / int(county[3]) >= (1 - tol) * float(county[12])

    assert int(county[10]) / int(county[4]) <= (1 + tol) * float(county[13])
    assert int(county[10]) / int(county[4]) >= (1 - tol) * float(county[13])

    assert int(county[11]) / int(county[5]) <= (1 + tol) * float(county[14])
    assert int(county[11]) / int(county[5]) >= (1 - tol) * float(county[14])

    data["data"].append(dict(zip(labels, list(county))))

print(json.dumps(data, indent=2))
