from selenium import webdriver
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
import re
import os
import json
import time
import csv
import base64
import easyocr
import cv2
def get_chalan(chalannumber):    
    URL = "https://echallan.tspolice.gov.in/publicview/"
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')
    options.add_argument('start-maximized')
    driver = webdriver.Chrome(executable_path=r'E:\courses\chromedriver_win32\chromedriver.exe', chrome_options=options)
    driver.get(URL)
    driver.find_element_by_xpath("//*[@id='REG_NO']").send_keys(chalannumber)
    # time.sleep(10)

    img_base64 = driver.execute_script("""
        var ele = arguments[0];
        var cnv = document.createElement('canvas');
        cnv.width = ele.width; cnv.height = ele.height;
        cnv.getContext('2d').drawImage(ele, 0, 0);
        return cnv.toDataURL('image/jpeg').substring(22);    
        """, driver.find_element_by_xpath("//*[@id='captchaDivtab1']/img"))
    with open(r"image.jpg", 'wb') as f:
        f.write(base64.b64decode(img_base64))
    # time.sleep(3)
   
    # img = cv2.imread()
    reader = easyocr.Reader(['en'])
    result = reader.readtext("image.jpg",paragraph="False")
    sum = str(result[0][1])
    a = int(sum[0]) + int(sum[2])
    driver.find_element_by_xpath("//*[@id='captchatab1']").send_keys(a)
    time.sleep(2)
    driver.find_element_by_xpath("//*[@id='tab1btn']").click()
    print(a)
    time.sleep(1)
    x = driver.find_elements_by_id("rtable")
    # for i in range(len(x)):
    chalans = x[0].text
    # print()
    final_list = []
    chalans = chalans.split('\n')
    l = 0
    k = 0
    for i in chalans:
        list_temp = []
        if l>=8 and i.find('Grand Total')!=0:
            k += 1
            list_temp.append(i)
            if k % 5 == 0:
                final_list.append(list_temp)
                list_temp.clear()



                print("index: ",l, " ",i )
        l+=1
    json_str_2 = json.dumps(final_list)
    # print("i= ", 0, " ",x[0].text)
    # x = len(driver.find_element_by_xpath("//*[@id='rtable']/tbody/tr").text)
    # num_cols = len (driver.find_elements_by_xpath("//*[@id='rtable']/tbody/tr/th"))
    # print(x, " and ", num_cols) 
    time.sleep(50)
    driver.close()
    return json_str_2
    # print("ye aya result", a)
    # print(result[0][1])

# captcha = input("Enter the captcha: ")
number = 'TS08ED1806'
get_chalan(number)