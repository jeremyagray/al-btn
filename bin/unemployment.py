#!/usr/bin/env python

from bs4 import BeautifulSoup as bs

with open("public/data/alabama/clfbycnty.aspx", "rb") as f:
    soup = bs(f, "html.parser")

id = "ctl00_ContentPlaceHolder1_GridView13"
print(soup.find(id=id))
