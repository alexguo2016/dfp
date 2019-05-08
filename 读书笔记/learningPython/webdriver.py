# -*- coding: utf-8 -*-
import json
from selenium import webdriver
wb = webdriver.Firefox()
# wb.get("http://www.baidu.com")
# http://www.dianping.com/guangzhou/ch10/r1519 大众点评
# https://gz.meituan.com/meishi/ 美团
meiturn_p2 = 'https://gz.meituan.com/meishi/pn2/'
# wb.get("https://gz.meituan.com/meishi/")
wb.get(meiturn_p2)
sourceCode = wb.page_source

with open('data.json', 'w') as writeFile:
    json.dump(sourceCode, writeFile)

print('done!')
